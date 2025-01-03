# otus-highload
OTUS Highload Architect

## Библиотеки

- HTTP [ogen](https://github.com/ogen-go/ogen)
- DB [pgxpool](https://github.com/jackc/pgx) 
- DI Framework [fx](https://github.com/uber-go/fx)
- Logging [zap](https://github.com/uber-go/zap)
- Observability [open-telemetry](https://github.com/open-telemetry/opentelemetry-go)

## Запуск локального окружения

Чтобы развернуть локальное окружение:

```shell
make up
```

Чтобы "убить" локальное окружение, нужно выполнить команду:

```shell
make down
```

## Запуск сервиса

После развертывания локального окружения:

```shell
make run
```

## Основные команды Makefile

- `up` - развернуть локальную среду
- `down` - "убить" локальную среду
- `run` - запуск приложения внутри контейнера
- `logs` - просмотр логов 
- `test` - запуск unit тестов
- `test/e2e` - запуск интеграционных тестов
- `shell` - войти в shell контейнера приложения
- `mocks` - запуск кодогенерации моков
- `lint` - запуск линтера
- `cover` - запуск unit тестов с покрытием 
- `cover/html` - запуск unit тестов с покрытием html

## Конфигурация

Приложение может работать в трех окружениях:

- `prod` - продуктовое окружение
- `dev` - окружение разработки (используется для разработки, тестирования и отладки)
- `test` - тестовое окружение (используется для запуска unit-тестов)

Тип окружения задается через переменную окружения `ENVIRONMENT`.

Каждое окружение имеет свой файл конфигурация:

- `config.prod.yaml`
- `config.dev.yaml`
- `config.test.yaml`

Директория, в которой будет происходить поиск файла конфигурации, задается через переменную окружения `CONFIG_PATH`.

