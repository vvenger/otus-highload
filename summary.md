# Homework 9: Отказоустойчивость приложений

## Цель

Уменьшить число точек отказа: несколько слейвов PostgreSQL за HAProxy,
несколько инстансов приложения за nginx.

---

## Архитектура

```
Клиент
  │
  ▼
nginx :8080                 
  ├── app (реплика 1) :8000
  └── app (реплика 2) :8000     
        │ write (5432)          │ read (5433)
        ▼                       ▼
   HAProxy :5432           HAProxy :5433
        │                       │ round-robin
        ▼                       ├── реплика (Sync Standby)
   Patroni Leader               └── реплика (Replica)
        │ потоковая репликация + авто-failover (etcd)
        ├──► реплика 1
        └──► реплика 2
```

- **PostgreSQL**: Patroni-кластер (1 лидер + 2 реплики) на etcd, потоковая
  репликация, автоматический failover при потере лидера.
- **Приложение**: масштабируемый сервис `app`, поднимается в N инстансах `make up APP_INSTANCES=N`, по умолчанию 2. Отдельные пулы на чтение (`DB_REPLICA` → `haproxy:5433`) и запись (`DB_MASTER` → `haproxy:5432`).
- **nginx**: резолвит upstream (app) через встроенный Docker DNS (127.0.0.11); при 
  обрыве соединения запрос ретраится (proxy_next_upstream) на следующую попытку 
  резолва.
- **HAProxy**: отвечает за маршрутизацию к Patroni через REST API (GET /primary и GET /replica), не решает кто лидер; запросы к репликам распределяются по алгоритму round-robin; при отказе TCP-подключения к ноде PostgreSQL повторяет попытку connect на другую ноду.

---

## JMeter тест-плана 

- Тест-план `jmeter/test-plan.jmx` с двумя Thread Group:
  - `GET /user/get/{id}` — поиск пользователя по ID (10 000 случайных id)
  - `GET /user/search` — поиск по имени и фамилии (10 000 пар имя/фамилия)
- Параметры: 50 потоков на thread группу (сумарно 100), ramp-up 5s, duration 90s
- Данные в БД: ~1 000 000 пользователей (`make fixture`), id для JMeter —
  `bash jmeter/prepare-data.sh` (выгружает актуальные id из БД).

---

## Результаты нагрузочного тестирования

Все три теста — единый последовательный сценарий: слейв, убитый в Этапе №2,
**не восстанавливается** перед Этапом №3 (Этап №3 стартует уже в деградированном
по БД состоянии — 1 лидер + 1 реплика вместо 1+2 — и дополнительно теряет
инстанс приложения).

| Этап            | Запросов | Ошибки     | RPS   |
| --------------- | -------- | ---------- | ----- |
| №1 Baseline     | 27 131   | 0 (0.00%)  | 300.6 |
| №2 Kill слейв   | 24 596   | 13 (0.05%) | 272.8 |
| №3 Kill инстанс | 16 384   | 0 (0.00%)  | 181.3 |

#### Этап №1. Baseline (нагрузка через nginx, 2 инстанса app, 1 лидер + 2 реплики)

| Запрос             | Запросов | Ошибки    | RPS   | Avg   | p95    | p99    |
| ------------------ | -------- | --------- | ----- | ----- | ------ | ------ |
| GET /user/get/{id} | 21 486   | 0 (0.00%) | 238.9 | 103ms | 274ms  | 343ms  |
| GET /user/search   | 5 645    | 0 (0.00%) | 62.5  | 676ms | 1360ms | 1530ms |
| **Total**          | 27 131   | 0 (0.00%) | 300.6 | 222ms | 1072ms | 1388ms |

подробнее: [`jmeter/results/test1-baseline/summary.md`](jmeter/results/test1-baseline/summary.md)

#### Этап №2. Kill-слейв PostgreSQL (нагрузка через nginx, 2 инстанса app, 1 лидер + 1 реплика)

| Запрос             | Запросов | Ошибки     | RPS   | Avg   | p95    | p99    |
| ------------------ | -------- | ---------- | ----- | ----- | ------ | ------ |
| GET /user/get/{id} | 18 765   | 2 (0.01%)  | 208.6 | 132ms | 312ms  | 383ms  |
| GET /user/search   | 5 831    | 11 (0.19%) | 64.7  | 652ms | 1063ms | 1227ms |
| **Total**          | 24 596   | 13 (0.05%) | 272.8 | 255ms | 877ms  | 1083ms |

После ~10s нагрузки конфигурации прошлого теста `docker kill -9 patroni-1` 

Лог HAProxy и app `logs/test2`

подробнее: [`jmeter/results/test2-kill-replica/summary.md`](jmeter/results/test2-kill-replica/summary.md)

#### Этап №3. Kill-инстанс бэкенда (нагрузка через nginx, 1 инстанс app, 1 лидер + 1 реплика)
| Запрос             | Запросов | Ошибки    | RPS   | Avg   | p95   | p99    |
| ------------------ | -------- | --------- | ----- | ----- | ----- | ------ |
| GET /user/get/{id} | 10 515   | 0 (0.00%) | 116.6 | 316ms | 476ms | 1002ms |
| GET /user/search   | 5 869    | 0 (0.00%) | 64.9  | 647ms | 942ms | 1233ms |
| **Total**          | 16 384   | 0 (0.00%) | 181.3 | 435ms | 842ms | 1060ms |

После ~10s нагрузки конфигурации прошлого теста `docker kill -9 social-network-app-1`

Лог `logs/test3` -  0 ошибок на клиенте, строки error/warn в логах nginx показывают 
механизм ретрая на живой инстанс.

подробнее: [`jmeter/results/test3-kill-app/summary.md`](jmeter/results/test3-kill-app/summary.md)

#### Воспроизведение

1. Поднятие окружения
```bash
make up
```
2. Добавление тестовых данных (~1 000 000 записей)
```bash
make fixture
```
3. Подготовка тестовых данных для JMeter
```bash
make jmeter/prepare
```
4. Этап №1 — baseline
```bash
make jmeter/test NAME=test1-baseline THREADS=50 RAMP_UP=5 DURATION=90
```
5. Этап №2 — запустить тест и убить реплику
```bash
make jmeter/test NAME=test2-kill-replica THREADS=50 RAMP_UP=5 DURATION=90
# в другом терминале: docker kill --signal=9 patroni-1
```
6. Этап №3 — слейв не восстанавливаем, запускаем тест и убиваем инстанс app
```bash
make jmeter/test NAME=test3-kill-app THREADS=50 RAMP_UP=5 DURATION=90
# в другом терминале: docker kill --signal=9 social-network-app-1
```


