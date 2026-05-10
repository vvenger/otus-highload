# Homework 4: Лента постов от друзей

## Стенд

- Docker Compose: `docker/docker-compose.yaml`
- Go-приложение
- PostgreSQL — хранение пользователей, друзей, постов
- Redis — кэш лент (`feed:{userID}`) + очередь событий (`post:events` stream)
- Feed Worker — consumer Redis Streams, fan-out при создании/обновлении/удалении постов

---

## Архитектура

```
HTTP Handler
    │
    ├─ FriendService   ──► PostgreSQL (friends)
    │
    ├─ PostService     ──► PostgreSQL (posts)
    │       │
    │       └─ XADD post:events ──► Redis Stream
    │
    └─ FeedService     ──► Redis List  feed:{userID}
            │                    │
            │             cache miss
            │                    │
            └──────────────► PostService.Posts (PostgreSQL)
                             └─ SetFeed (Redis List)

Redis Stream: post:events
    └─► Feed Worker (XREADGROUP)
            ├─ post.created  ──► GetFollowerIDs ──► LPUSH feed:{followerID} × N
            ├─ post.updated  ──► GetFollowerIDs ──► DEL   feed:{followerID} × N
            └─ post.deleted  ──► GetFollowerIDs ──► DEL   feed:{followerID} × N
```

---

## Стратегия кэша

Лента хранится в Redis List `feed:{userID}` (последние 1000 записей, новые→старые).

**Чтение:**
- `offset < 1000` → `LRANGE feed:{userID} offset offset+limit-1`
  - Hit: возвращаем из кэша
  - Miss: загружаем из PostgreSQL последние 1000 постов авторов (себя и друзей), сохраняем в Redis List через `RPUSH` с обрезкой до 1000 элементов (`LTRIM`), возвращаем запрошенный срез
- `offset >= 1000` → запрос напрямую в PostgreSQL с оригинальным offset/limit

**Запись (fan-out on write):**
- Создание поста → `LPUSH feed:{followerID}` + `LTRIM 0 999` для каждого подписчика
- Обновление/удаление → `DEL feed:{followerID}` (инвалидация, пересборка при следующем запросе)

**Инвалидация при изменении списка друзей:**
- `friend/set`, `friend/delete` → `DEL feed:{userID}` синхронно

---

## Запуск

**Шаги:**

1. Поднять окружение:
```bash
make up
```

2. Загрузить тестовые данные (10 пользователей + 8392 поста):
```bash
make fixture
```

3. Запустить приложение:
```bash
make run
```

---

## Как тестировать

В корне проекта находится Postman-коллекция `OTUS Highload.postman_collection.json`. Импортировать в Postman и выполнить следующий сценарий:

**1. Регистрация и вход**

Зарегистрировать нового пользователя через `/user/register`. ID из ответа сохранится в переменную `userId`. Затем выполнить `/login` — токен сохранится в переменную `token` и будет автоматически подставляться в заголовок `Authorization` для всех защищённых запросов.

**2. Создать свой пост**

Выполнить `/post/create` с произвольным текстом. ID созданного поста сохранится в переменную `postId`. Открыть ленту через `/post/feed` — должен отображаться только что созданный пост.

**3. Добавить друзей и посмотреть ленту**

После `make fixture` в БД доступны 10 тестовых пользователей. Подставить любой их ID в переменную `friendId` и выполнить `/friend/set/{user_id}`. Затем открыть `/post/feed` — в ленте появятся посты добавленного друга (фикстура содержит ~839 постов на каждого пользователя).

**4. Отписаться и посмотреть ленту**

Выполнить `/friend/delete/{user_id}` с тем же `friendId`. Открыть `/post/feed` — посты удалённого друга исчезнут из ленты, останутся только свои.
