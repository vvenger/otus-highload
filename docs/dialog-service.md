# Dialog Service 

## Протокол

- **Транспорт**: HTTP/1.1
- **Формат данных**: JSON (`Content-Type: application/json`)
- **Аутентификация**: `Authorization: Bearer <JWT>`

JWT-токен выдаётся монолитом на `/login` и принимается обоими сервисами (общий `secret` в конфиге).

## Сквозное логирование (X-Request-Id)

Заголовок `X-Request-Id` передаётся сквозь всю цепочку:

```
Client → Monolith → Chat
```

- Если клиент прислал `X-Request-Id` — значение сохраняется.
- Если нет — генерируется новый UUID.
- Для запросов через монолит, значение пробрасывается в проксируемый запрос к `chat`.
- Оба сервиса возвращают `X-Request-Id` в заголовке ответа.

## Эндпоинты

### Chat-сервис (порт 8001)

| Метод  | Путь                     | Описание                                             |
| ------ | ------------------------ | ---------------------------------------------------- |
| `POST` | `/dialog/{user_id}/send` | Отправить сообщение пользователю `user_id`           |
| `GET`  | `/dialog/{user_id}/list` | Получить историю переписки с пользователем `user_id` |

**POST /dialog/{user_id}/send**

```
Authorization: Bearer <token>
X-Request-Id: <uuid>          (опционально)

{"text": "Hello!"}
```

Ответ: `200 OK` (пустое тело)

**GET /dialog/{user_id}/list**

```
Authorization: Bearer <token>
X-Request-Id: <uuid>          (опционально)
```

Ответ: `200 OK`
```json
[
  {"from": "<uuid>", "to": "<uuid>", "text": "Hello!"}
]
```

### Монолит (порт 8000) — обратная совместимость

Те же эндпоинты: `POST /dialog/{user_id}/send`, `GET /dialog/{user_id}/list`.

Запрос проксируется в chat-сервис. Клиент не знает об изменениях.

## Схема взаимодействия

### Новые клиенты (прямой доступ)

```
Client
  │
  │  POST /dialog/{user_id}/send
  │  Authorization: Bearer <jwt>
  │  X-Request-Id: abc-123
  ▼
Chat :8001
  │
  ├── Validate JWT
  ├── Save message → Citus DB
  └── 200 OK
      X-Request-Id: abc-123
```

### Старые клиенты (через монолит)

```
Client
  │
  │  POST /dialog/{user_id}/send
  │  Authorization: Bearer <jwt>
  │  X-Request-Id: abc-123        (или генерируется монолитом)
  ▼
Monolith :8000
  │
  ├── RecoveryMiddleware
  │     └── X-Request-Id: abc-123 → context
  │
  ├── ServeMux: /dialog/* → ReverseProxy
  │
  │  POST /dialog/{user_id}/send
  │  Authorization: Bearer <jwt>  (передаётся как есть)
  │  X-Request-Id: abc-123        (из context)
  ▼
Chat :8001
  │
  ├── Validate JWT
  ├── Save message → Citus DB
  └── 200 OK
      X-Request-Id: abc-123
  │
  ▼
Monolith :8000
  └── 200 OK
      X-Request-Id: abc-123
  │
  ▼
Client
```

## Хранилище

Сервис диалогов хранит сообщения в своей БД (**Citus**).

## Конфигурация монолита

```yaml
# cmd/socialnetwork/config.dev.yaml
chat:
  url: http://chat:8001
  timeout_sec: 5
```


