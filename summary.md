# Нагрузочное тестирование GET /user/search

## Конфигурация

- **Эндпоинт:** `GET /user/search?first_name=XXXX&last_name=XXXX`
- **Данные:** 10 000 случайных префиксов (4 символа) из таблицы `users`
- **Длительность:** 60 сек на каждый прогон, ramp-up 10 сек
- **PostgreSQL:** `max_connections=200`, app pool `max_conns=150`
- **Строк в таблице:** ~1 000 000

## Результаты до индекса

| Потоки | Запросов | Throughput | Avg latency | Max latency | Errors |
| -----: | -------: | ---------: | ----------: | ----------: | ------ |
|      1 |     2107 | 35.1 req/s |       28 мс |       53 мс | 0      |
|     10 |     3700 | 61.5 req/s |      149 мс |      504 мс | 0      |
|    100 |     4265 | 70.0 req/s |     1302 мс |     2395 мс | 0      |
|    200 |     3993 | 64.3 req/s |     2814 мс |     5150 мс | 0      |

Подробнее:
- `jmeter/results/before_1/summary.md`
- `jmeter/results/before_10/summary.md`
- `jmeter/results/before_100/summary.md`
- `jmeter/results/before_200/summary.md`

```
QUERY PLAN
Gather  (cost=1000.00..22172.67 rows=1 width=103) (actual time=0.237..33.547 rows=6 loops=1)
  Workers Planned: 2
  Workers Launched: 2
  ->  Parallel Seq Scan on users  (cost=0.00..21172.57 rows=1 width=103) (actual time=17.212..27.360 rows=2 loops=3)
        Filter: (((first_name)::text ~~ 'Робе%'::text) AND ((second_name)::text ~~ 'Абра%'::text))
        Rows Removed by Filter: 333308
Planning Time: 0.281 ms
Execution Time: 33.581 ms
```

## Индекс

```sql
CREATE INDEX IF NOT EXISTS users_second_name_first_name_idx 
  ON users (second_name varchar_pattern_ops, first_name varchar_pattern_ops);  
```
- Фамилий больше чем имен, поэтому порядок (second_name, first_name), так как у second_name больше селективность.

- varchar_pattern_ops - PostgreSQL может работать со строками как с числами. Он понимает, что любая строка, начинающаяся на «Робе», находится в промежутке между «Робе» и «Робж». Вместо перебора всей таблицы база переходит к нужной странице в B-Tree индексе

## Результаты после индекса

| Потоки | Запросов | Throughput | Avg latency | Max latency | Errors |
| -----: | -------: | ---------: | ----------: | ----------: | ------ |
|      1 |   97 308 | 1620 req/s |        0 мс |       25 мс | 0      |
|     10 |  282 544 | 4703 req/s |        1 мс |       26 мс | 0      |
|    100 |  344 333 | 5725 req/s |       15 мс |      264 мс | 0      |
|    200 |  341 972 | 5681 req/s |       31 мс |      635 мс | 0      |

Подробнее:
- `jmeter/results/after_1/summary.md`
- `jmeter/results/after_10/summary.md`
- `jmeter/results/after_100/summary.md`
- `jmeter/results/after_200/summary.md`


```
QUERY PLAN
Index Scan using users_second_name_first_name_idx on users  (cost=0.42..156.02 rows=1 width=103) (actual time=0.036..0.056 rows=6 loops=1)
  Index Cond: (((second_name)::text ~>=~ 'Абра'::text) AND ((second_name)::text ~<~ 'Абрб'::text) AND ((first_name)::text ~>=~ 'Робе'::text) AND ((first_name)::text ~<~ 'Робж'::text))
  Filter: (((first_name)::text ~~ 'Робе%'::text) AND ((second_name)::text ~~ 'Абра%'::text))
Planning Time: 0.323 ms
Execution Time: 0.073 ms
```

## Выводы

##### После индекса у системы значительно выросла пропускная способность и снизилось latency
- При 1 потоке throughput вырос (35 → 1620 req/s)
- При 10 потоках — (61 → 4703 req/s)
- При 100 потоках — (70 → 5725 req/s)
- При 200 потоках — (64 → 5681 req/s), система стабильна, хоть Throughput понизился относительно 100 запросов, это из-за того что в приложении используется `connection-pool` на `150 соеденений`.


## Повторения теста с индексом
1. Поднятие окружения и добавление тестовых данных (~1 000 000 записей)
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
4. Выполнения теста данных для JMeter
```bash
make jmeter/test THREADS=10 NAME=after_10 #Параметры кол-во потоков и директория результата
```   

## Повторения теста без индекса
1. Поднятие окружения и добавление тестовых данных (~1 000 000 записей)
```bash
make up
```

2. Удалить индекс из БД

3. Выполненить шаги 2-4 описания с индексом
