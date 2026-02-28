# Замер: чтение с мастера

## Параметры теста

| Параметр        | Значение                             |
| --------------- | ------------------------------------ |
| Тест            | master-only                          |
| Threads         | 50                                   |
| Ramp-up         | 10s                                  |
| Duration        | 60s                                  |
| DB_REPLICA_PORT | 5432 (мастер)                        |
| Эндпоинты       | GET /user/get/{id}, GET /user/search |
| Think Time      | 100ms                                |
| Тестовых данных | 10000                                |


## Результаты

| Метрика        | Значение    |
| -------------- | ----------- |
| Throughput     | 161.5 req/s |
| Avg Latency    | 463 ms      |
| Min Latency    | 0 ms        |
| Max Latency    | 1611 ms     |
| Errors         | 0 (0.00%)   |
| Всего запросов | 9816        |

## Конфигурация кластера

- Patroni: 1 мастер + 2 реплики (async)
- HAProxy: порт 5432 (RW → primary), порт 5432 (RO → replicas)
- Чтение направлено на мастер (DB_REPLICA_PORT=5432)

## Примечание
Min Latency	0 ms - возможно окрглуние JMeter, некоторые запросы `/user/get/{id}` в пределах 1 ms. Файл результата: `results.jtl`