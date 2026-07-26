# Этап №3. Kill-инстанс бэкенда

Продолжение сценария Этапа №2 — слейв `patroni-1` **не восстановлен**.
Нагрузка через nginx, 50+50 потоков, ramp-up 5s, duration 90s.
После `kill` остается 1 инстанс app и 1 реплика PostgreSQL.

```bash
# ~10s после старта теста
docker kill --signal=9 social-network-app-1
```

| Запрос             | Запросов | Ошибки    | RPS   | Avg   | p95   | p99    |
| ------------------ | -------- | --------- | ----- | ----- | ----- | ------ |
| GET /user/get/{id} | 10 515   | 0 (0.00%) | 116.6 | 316ms | 476ms | 1002ms |
| GET /user/search   | 5 869    | 0 (0.00%) | 64.9  | 647ms | 942ms | 1233ms |
| **Total**          | 16 384   | 0 (0.00%) | 181.3 | 435ms | 842ms | 1060ms |

## Логи

**app** -  0 ошибок на клиенте.

**nginx** (`logs/test3/nginx.log`) - строки error/warn показывают механизм ретрая на живой инстанс.
```
026/07/26 13:57:17 [error] 32#32: *217869 upstream prematurely closed connection while reading response header from upstream ...
2026/07/26 13:57:17 [warn] 32#32: *217869 upstream server temporarily disabled while reading response header from upstream ...
```

