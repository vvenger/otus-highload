# Homework 7: In-Memory СУБД (Tarantool) для диалогов

## Обзор

Перенос хранения диалогов из распределённой SQL-БД (Citus) в In-Memory СУБД Tarantool.
Логика операций `Send` / `List` реализована в виде Lua UDF в Tarantool — Go-сервис вызывает только именованные функции через драйвер.
Lua script - `docker/tarantool/init.lua`

## Архитектура

```
chat (порт 8001)
  → conn.Call("dialog_send", ...) → Tarantool
  → conn.Call("dialog_list", ...) → Tarantool
                                       ↓
                                  space messages
                                  index: dialog (by dialog_id)
```

## Результаты нагрузочного тестирования

Тест: `POST /dialog/{user_id}/send`, 10 потоков, 30 сек.

### До: Citus (PostgreSQL шардирование)

| Метрика  | Значение |
| -------- | -------- |
| Requests | 132 343  |
| RPS      | 4 489    |
| Avg      | 1 ms     |
| p50      | 2 ms     |
| p95      | 3 ms     |
| p99      | 5 ms     |
| Max      | 58 ms    |
| Errors   | 0        |

### После: Tarantool

| Метрика  | Значение |
| -------- | -------- |
| Requests | 209 642  |
| RPS      | 6 981    |
| Avg      | 1 ms     |
| Max      | 250 ms   |
| Errors   | 0        |

### Сравнение

| Метрика | Citus  | Tarantool | Δ    |
| ------- | ------ | --------- | ---- |
| RPS     | 4 407  | 6 981     | +58% |
| Avg     | 2 ms   | 1 ms      | -50% |
| Max     | 294 ms | 250 ms    | -15% |
| Errors  | 0      | 0         | —    |

---

## Как воспроизвести результаты

### 1. Поднять окружение

```bash
make up
```

### 2. Загрузить фикстуры

```bash
make fixture
```

### 3. Запустить приложения

```bash
make run
```

### 4. Сгенерировать тестовых пользователей

```bash
bash jmeter/prepare-data.sh
```

### 5. Запустить нагрузочный тест (Tarantool)

```bash
bash jmeter/run-test.sh after
```

### Как получить результат Citus

Для воспроизведения результата с шардированием, необходимо переключиться на ветку [homework5](https://github.com/vvenger/otus-highload/tree/homework5) (шардирование через Citus) и запустить тот же тест. JMeter-сценарий идентичен.

```bash
make down
git checkout homework5
make up && make fixture 
make run
bash jmeter/run-test.sh before
```

