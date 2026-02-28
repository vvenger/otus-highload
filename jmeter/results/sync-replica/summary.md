# Замер: Чтение с реплик (синхронная репликация)

## Параметры теста

| Параметр        | Значение                             |
| --------------- | ------------------------------------ |
| Тест            | sync-replica                         |
| Threads         | 50                                   |
| Ramp-up         | 10s                                  |
| Duration        | 60s                                  |
| DB_REPLICA_PORT | 5433 (реплики)                       |
| Эндпоинты       | GET /user/get/{id}, GET /user/search |
| Think Time      | 100ms                                |
| Тестовых данных | 10000                                |

## Конфигурация кластера

- Patroni: 1 мастер + 1 Sync Standby + 1 асинхронная реплика
- synchronous_mode: true
- Leader: patroni-3, Sync Standby: patroni-2, Replica: patroni-1
- HAProxy: порт 5432 (RW → primary), порт 5433 (RO → replicas)

## Результаты

| Метрика        | Значение    |
| -------------- | ----------- |
| Throughput     | 137.8 req/s |
| Avg Latency    | 559 ms      |
| Min Latency    | 0 ms        |
| Max Latency    | 1956 ms     |
| Errors         | 0 (0.00%)   |
| Всего запросов | 8391        |

## Сравнение async vs sync

| Метрика     | Реплики (async) | Реплики (sync) | Разница |
| ----------- | --------------- | -------------- | ------- |
| Throughput  | 140.3 req/s     | 137.8 req/s    | -2%     |
| Avg Latency | 546 ms          | 559 ms         | +2%     |
| Max Latency | 1953 ms         | 1956 ms        | +0.2%   |
| Errors      | 0 (0.00%)       | 0 (0.00%)      | —       |

Синхронная репликация дала минимальный overhead (+2% latency) — запись на мастере ждёт подтверждения от Sync Standby перед ответом клиенту.


