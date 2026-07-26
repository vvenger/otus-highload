# Этап №2. Kill-слейв PostgreSQL

Продолжение сценария Этапа №1. Нагрузка через nginx, 50+50 потоков, ramp-up 5s, duration 90s.
После `kill` остаются 2 инстанса app и 1 реплика PostgreSQL.

```bash
# ~10s после старта теста
docker kill --signal=9 patroni-1
```

| Запрос             | Запросов | Ошибки     | RPS   | Avg   | p95    | p99    |
| ------------------ | -------- | ---------- | ----- | ----- | ------ | ------ |
| GET /user/get/{id} | 18 765   | 2 (0.01%)  | 208.6 | 132ms | 312ms  | 383ms  |
| GET /user/search   | 5 831    | 11 (0.19%) | 64.7  | 652ms | 1063ms | 1227ms |
| **Total**          | 24 596   | 13 (0.05%) | 272.8 | 255ms | 877ms  | 1083ms |

## Логи

HAProxy (`logs/test2/haproxy.log`):
```
Server postgres_replicas/patroni-1 is DOWN, reason: Layer4 timeout, check duration: 3001ms.
1 active and 0 backup servers left. 13 sessions active, 0 requeued, 0 remaining in queue.
```

Приложение (`logs/test2/app.log`) — 13 ошибок, две причины:
```
# обрыв соединения
"error":"could not get user: could not get user: unexpected EOF"

# попытка нового соединения ещё успела попасть на patroni-1 до пометки DOWN
"error":"...failed to connect...tls error: server refused TLS connection..." time:"38.2s"
```

