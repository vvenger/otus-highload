# Тест отказоустойчивости

## Конфигурация кластера

- Patroni: 1 мастер + 1 Sync Standby + 1 асинхронная реплика
- synchronous_mode: true
- До failover: patroni-3 (Leader), patroni-2 (Sync Standby), patroni-1 (Replica)

## Результаты

| Метрика                                            | Значение          |
| -------------------------------------------------- | ----------------- |
| Записей в БД (count)                               | 1816              |
| Последний sequence (max id)                        | 1819              |
| Прерванных транзакций (gaps)                       | 3                 |
| **Потерь закоммиченных транзакций (data loss)**    | **0**             |
| **Недоступность на запись (write unavailability)** | **~35 сек**       |
| Время failover                                     | ~35 сек (ttl=30s) |


После падения мастера Patroni автоматически промоутил Sync Standby (patroni-2) в новый лидер (Timeline 2).

Во время ~35-секундного окна failover все запросы на запись **отклонялись** HAProxy (нет доступного мастера) — ошибки подавлялись.

## Состояние кластера до failover

| Member    | Role         | TL  |
| --------- | ------------ | --- |
| patroni-1 | Replica      | 1   |
| patroni-2 | Sync Standby | 1   |
| patroni-3 | Leader       | 1   |

## Состояние кластера после failover

| Member    | Role         | TL  |
| --------- | ------------ | --- |
| patroni-1 | Sync Standby | 2   |
| patroni-2 | Leader       | 2   |


