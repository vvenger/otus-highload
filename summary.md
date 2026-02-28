# Homework 3: Репликация PostgreSQL

## Стенд

- Docker Compose: `docker/docker-compose.yaml`
- Go-приложение 
- Patroni кластер + HAProxy + etcd
- 1 мастер + 2 реплики (потоковая репликация)
- HAProxy: порт 5432 → мастер (RW), порт 5433 → реплики (RO)

---

## JMeter тест-плана 

- Тест-план `jmeter/test-plan.jmx` с двумя Thread Group:
  - `GET /user/get/{id}` — поиск пользователя по ID
  - `GET /user/search` — поиск по имени и фамилии
- Параметры: 50 потоков, ramp-up 10s, duration 60s, think time 100ms
- Тестовые данные берутся из CSV-файлов (`jmeter/data/user_ids.csv`, `jmeter/data/search_params.csv`). Нужно сгенерировать после поднятия кластера. 

---

## Настройка Patroni кластера

**Конфигурация** (`docker/patroni/patroni.template.yml`):
- 1 мастер + 2 реплики, потоковая репликация
- `wal_level: replica`, `hot_standby: on`
- `max_wal_senders: 10`, `max_replication_slots: 10`

**Проверка кластера:**
```bash
docker compose -p social-network -f docker/docker-compose.yaml exec -T patroni-1 \
  gosu postgres patronictl -c /etc/patroni/patroni.yml list
```

```
| Member    | Role    | State     | TL | Lag |
| patroni-1 | Leader  | running   |  1 |     |
| patroni-2 | Replica | streaming |  1 |   0 |
| patroni-3 | Replica | streaming |  1 |   0 |
```
---

## Этап №1. Чтение с мастера

**Шаги:**

1. В docker-compose установить параметр `DB_REPLICA_PORT=5432` и в config.dev.yaml параметр `db.replica.port: 5432`
2. Поднят кластер
```bash
make up
```
3. Загрузка тестовых данных
```bash
make fixture   # ~1М пользователей
```
4. Подготовка тестовых данных для JMeter (10000 записей). Файлы `jmeter/data/user_ids.csv`, `jmeter/data/search_params.csv`
```bash
bash jmeter/prepare-data.sh
```
5. Запуск приложения:
```bash
make run
```
6. Запуск теста
```bash
bash jmeter/run-test.sh master-only
```

**Результат:**

| Метрика        | Значение    |
| -------------- | ----------- |
| Throughput     | 161.5 req/s |
| Avg Latency    | 463 ms      |
| Min Latency    | 0 ms        |
| Max Latency    | 1611 ms     |
| Errors         | 0 (0.00%)   |
| Всего запросов | 9816        |

Подробности: `jmeter/results/master-only/summary.md`

---

## Этап №2. Чтение с реплики

**Шаги:**

1. Остановить кластер
```bash
make down #остановка кластера
```
2. Внести изменения `Настройка Patroni кластера`
3. В docker-compose установить параметр `DB_REPLICA_PORT=5433` и в config.dev.yaml параметр `db.replica.port: 5433`
4. Выполнить `шаги 2-5 из Этапа №1` для поднятия кластера и формирования тестовых данных.
5. Запуск теста
```bash
bash jmeter/run-test.sh replica-only
```

**Результат:**

| Метрика        | Значение    |
| -------------- | ----------- |
| Throughput     | 140.3 req/s |
| Avg Latency    | 546 ms      |
| Min Latency    | 0 ms        |
| Max Latency    | 1953 ms     |
| Errors         | 0 (0.00%)   |
| Всего запросов | 8564        |

Подробности: `jmeter/results/replica-only/summary.md`

---

## Этап №3. Кворумная синхронная репликация

**Шаги:**

1. Остановить кластер
```bash
make down #остановка кластера
```

2. Добавлен параметр в `docker/patroni/patroni.template.yml`:
```yaml
bootstrap:
  dcs:
    synchronous_mode: true
```

3. Проверка активации синхронного режима:
```bash
docker compose -p social-network -f docker/docker-compose.yaml exec -T patroni-1 \
  gosu postgres patronictl -c /etc/patroni/patroni.yml list
```

4. Выполнить `шаги 2-5 из Этапа №1` для поднятия кластера и формирования тестовых данных.
   
5. Запуск теста
```bash
bash jmeter/run-test.sh sync-replica
```

**Результат:**

| Метрика        | Значение    |
| -------------- | ----------- |
| Throughput     | 137.8 req/s |
| Avg Latency    | 559 ms      |
| Min Latency    | 0 ms        |
| Max Latency    | 1956 ms     |
| Errors         | 0 (0.00%)   |
| Всего запросов | 8391        |

Подробности: `jmeter/results/sync-replica/summary.md`

---

## Этап №4. Отказоустойчивость

**Шаги:**

1. Перезапустить кластер
```bash
make down
make up
```

2. Создать тестовую таблицу:
```bash
docker compose -p social-network -f docker/docker-compose.yaml exec -T \
  -e PGPASSWORD=root patroni-1 gosu postgres \
  psql -h haproxy -p 5432 -U root -d main \
  -c "CREATE TABLE failover_test (id SERIAL PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now());"
```

3. Находим master чтобы на нем запустить непрерывную вставку данных:
```bash
docker compose -p social-network -f docker/docker-compose.yaml exec -T patroni-1 \
  gosu postgres patronictl -c /etc/patroni/patroni.yml list
```
4. Запустить непрерывную нагрузка на запись (~40 INSERT/с):
```bash
NODE_NAME=patroni-3 bash jmeter/write-load.sh
```

5. Убит текущий мастер (`patroni-3`):
```bash
docker stop -t 0 patroni-3
```

6. Через ~35 секунд (ttl=30s) Patroni промоутил Sync Standby:
```bash
docker compose -p social-network -f docker/docker-compose.yaml exec -T patroni-1   gosu postgres patronictl -c /etc/patroni/patroni.yml list
```

```
| Member    | Role         | State     | TL |
| patroni-1 | Sync Standby | streaming |  2 |
| patroni-2 | Leader       | running   |  2 |
```

5. Останавливаем нагрузку, подсчёт результатов:
```sql
SELECT count(*), max(id), min(id) FROM failover_test;
-- count=1816, max=1819, min=1
```

**Результат:**

| Метрика                                            | Значение    |
| -------------------------------------------------- | ----------- |
| Записей в БД                                       | 1816        |
| Последний sequence                                 | 1819        |
| Прерванных транзакций                              | 3           |
| **Потерь закоммиченных транзакций (data loss)**    | **0**       |
| **Недоступность на запись (write unavailability)** | **~35 сек** |
| Время failover                                     | ~35 сек     |

Подробности: `jmeter/results/failover/summary.md`

