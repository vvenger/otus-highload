# Homework 5: Шардирование диалогов с Citus

## Архитектура

Сервис диалогов вынесен в отдельный сервис `chat` (порт 8001) с базой данных на кластере Citus (1 координатор + 2 воркера).

Шардирование осуществляется по `dialog_id`:

```
dialog_id = hashUUID5(sorted(user_a_id, user_b_id))
```

- Диалог A↔B и B↔A имеют одинаковый `dialog_id` → всегда один шард
- Равномерное распределение: каждая пара пользователей независима
- Решардинг без даунтайма: `SELECT citus_rebalance_start()`

## Как тестировать

### 1. Поднять кластер

```bash
make up
```

### 2. Загрузить тестовые данные

100 пользователей-получателей для теста диалогов:

```bash
make fixture
```

### 3. Запустить приложение

```bash
make run
```

### 4. Запустить нагрузочный тест

```bash
bash jmeter/run-test.sh
```

Описание теста:
- Тест запускает 10 потоков, каждый поток регистрирует своего пользователя (`POST /user/register`) и получает JWT-токен (`POST /login`)
- Далее 10 потоков, 30 секунд: каждый поток отправляет сообщения всем 100 пользователям по кругу (`POST /dialog/{user_id}/send`)
- Результаты сохраняются в `jmeter/results/<timestamp>/`.

## Проверка заполненности шардов

Подключиться к координатору:

```bash
make shell/citus
```

Количество строк по шардам:

```sql
SELECT result FROM run_command_on_shards('messages', 'SELECT count(*) FROM %s') ORDER BY shardid;
```

Итоги по шардам и воркерам:

```sql
SELECT
    s.nodename,
    COUNT(*)                    AS shards,
    SUM(r.result::bigint)       AS total_rows
FROM citus_shards s
JOIN run_command_on_shards('messages', 'SELECT count(*) FROM %s') r USING (shardid)
WHERE s.table_name = 'messages'::regclass
GROUP BY s.nodename
ORDER BY s.nodename;
```

Итоговое количество сообщений:

```sql
SELECT count(*) FROM messages;
```

## Результаты нагрузочного теста

| Метрика          | Значение    |
| ---------------- | ----------- |
| Потоки           | 10          |
| Длительность     | 30 сек      |
| Всего запросов   | 73 839      |
| RPS              | 2 504 req/s |
| Средняя задержка | 4 мс        |
| Ошибки           | 0 (0.00%)   |

## Распределение по шардам

Всего записей в таблице `messages`: **73 839**

| Шард            | Воркер        | Строк |
| --------------- | ------------- | ----- |
| messages_102008 | citus-worker1 | 2 517 |
| messages_102009 | citus-worker2 | 2 423 |
| messages_102010 | citus-worker1 | 1 760 |
| messages_102011 | citus-worker2 | 2 530 |
| messages_102012 | citus-worker1 | 2 304 |
| messages_102013 | citus-worker2 | 2 063 |
| messages_102014 | citus-worker1 | 2 895 |
| messages_102015 | citus-worker2 | 2 237 |
| messages_102016 | citus-worker1 | 2 671 |
| messages_102017 | citus-worker2 | 2 793 |
| messages_102018 | citus-worker1 | 2 217 |
| messages_102019 | citus-worker2 | 2 469 |
| messages_102020 | citus-worker1 | 2 077 |
| messages_102021 | citus-worker2 | 2 101 |
| messages_102022 | citus-worker1 | 2 666 |
| messages_102023 | citus-worker2 | 1 449 |
| messages_102024 | citus-worker1 | 2 465 |
| messages_102025 | citus-worker2 | 2 614 |
| messages_102026 | citus-worker1 | 2 950 |
| messages_102027 | citus-worker2 | 2 067 |
| messages_102028 | citus-worker1 | 2 633 |
| messages_102029 | citus-worker2 | 1 257 |
| messages_102030 | citus-worker1 | 2 427 |
| messages_102031 | citus-worker2 | 1 245 |
| messages_102032 | citus-worker1 | 2 018 |
| messages_102033 | citus-worker2 | 2 874 |
| messages_102034 | citus-worker1 | 2 593 |
| messages_102035 | citus-worker2 | 2 533 |
| messages_102036 | citus-worker1 | 1 786 |
| messages_102037 | citus-worker2 | 2 358 |
| messages_102038 | citus-worker1 | 2 131 |
| messages_102039 | citus-worker2 | 2 716 |

**Итого по воркерам:**

| Воркер        | Шардов | Строк  |
| ------------- | ------ | ------ |
| citus-worker1 | 16     | 38 110 |
| citus-worker2 | 16     | 35 729 |

Все 32 шарда заполнены. Распределение: от 1 245 до 2 950 строк на шард.
