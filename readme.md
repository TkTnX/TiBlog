# TiBlog – личный блог и портфолио

TiBlog – это полнофункциональный блог и сайт‑портфолио Тимура Галиакбарова.  
Проект состоит из **frontend** (Next.js App Router) и **backend** (NestJS + Prisma + PostgreSQL) и реализует:

- **Посты блога** (создание, список, фильтрация, сортировка, детальная страница, похожие посты, комментарии, лайки).
- **Проекты** (портфолио с категориями, стеком технологий и детальными описаниями).
- **Категории** (общие для постов и проектов).
- **Комментарии и лайки** (только для авторизованных пользователей).
- **Аутентификацию и роли** (пользователь / админ).
- **Админ‑панель** для управления постами, проектами и категориями.
- **Загрузку файлов** (например, превью‑картинки).

---

## Стек и структура репозитория

- **Frontend**: `frontend/`
  - Next.js (App Router), TypeScript
  - Атомарная/feature‑ориентированная архитектура: `entities/`, `features/`, `widgets/`, `shared/`
  - Axios‑клиент с поддержкой рефреша токена
  - Tailwind / кастомные классы для стилизации (по классам в компонентах)
- **Backend**: `backend/`
  - NestJS, TypeScript
  - Prisma ORM, PostgreSQL (`prisma/schema.prisma`)
  - JWT‑аутентификация, cookie для refresh‑токена
  - Swagger/OpenAPI документация (`/api/openapi.json`, UI на `/api`)
  - Статическая раздача загруженных файлов (`/uploads`)

Общая структура:

- `backend/` – серверное API
- `frontend/` – клиентское приложение
- `readme.md` – общая документация (этот файл)

---

## Backend (NestJS + Prisma)

### Обзор

Backend реализован на NestJS и организован по модулям:

- `PostModule` – посты блога
- `ProjectModule` – проекты (портфолио)
- `CategoryModule` – категории
- `CommentModule` – комментарии
- `LikeModule` – лайки
- `UserModule` – пользователи и профиль
- `AuthModule` – аутентификация и выдача токенов
- `UploadModule` – загрузка файлов
- `PrismaModule` – доступ к базе данных


### Модели данных (Prisma)

Основные сущности описаны в `backend/prisma/schema.prisma`:

- **Post**
  - `id`, `preview`, `title`, `content`, `views`
  - Связи: `categories` (`Category[]`), `comments` (`Comment[]`), `likes` (`Like[]`)
- **Category**
  - `id`, `name` (уникальное), `color`
  - Связи: `posts`, `projects`
- **Like**
  - Принадлежит `post` и `user`
- **Comment**
  - `text`, принадлежит `post`, опционально `user`
- **User**
  - `username`, `password`, `email` (уникальный), `role` (`ERole.ADMIN` или `ERole.USER`)
  - Связи: `likes`, `comments`
- **Project**
  - `title`, `preview`, `stack` (массив строк), `content`, `categories`

Роли:

- `ERole.ADMIN`
- `ERole.USER`

### Аутентификация и авторизация

- **Регистрация и логин**:
  - `POST /api/auth/register` – регистрация нового пользователя
  - `POST /api/auth/login` – вход по email и паролю
  - Пароль хэшируется через `argon2`
- **Рефреш токена**:
  - `POST /api/auth/refresh` – обновление пары токенов по `refreshToken` в cookie
- **Формат токенов**:
  - Access token – JWT, отдается в JSON‑ответе (`{ access_token }`)
  - Refresh token – HTTP‑only cookie `refreshToken`, домен задаётся через `COOKIE_DOMAIN`
- **Guard’ы**:
  - `AuthGuard` – проверка refresh‑токена в куках, верификация через `JwtService`, запись payload в `req.user`
  - `RolesGuard` + декоратор `@Roles([ERole.ADMIN])` – проверка роли пользователя
  - Декоратор `@Authorized('userId' | 'email' | 'role')` – удобное получение полей из `req.user`



### Основные API‑модули и эндпоинты

Все маршруты имеют префикс `/api` (см. `app.setGlobalPrefix('api')`).

#### Auth (`/api/auth`)

- `POST /auth/register` – регистрация
- `POST /auth/login` – логин
- `POST /auth/refresh` – обновление токенов по refresh cookie

#### Users (`/api/users`)

- `GET /users@me` – получить текущего пользователя  
  Требует `AuthGuard`, использует `@Authorized('userId')`.

#### Posts (`/api/posts`)

- `GET /posts` – список постов с поддержкой query‑параметров для фильтрации/сортировки
- `GET /posts/:postId` – получение поста по ID
- `POST /posts` – создание поста (только для `ADMIN`)
- `DELETE /posts/:id` – удаление поста (только для `ADMIN`)
- DTO:
  - `PostRequest` – тело запроса при создании/обновлении (контент, превью, заголовок, список категорий)
  - `PostResponse` – формат ответа с `_count.likes`, категориями, комментариями, датами и т.д.

#### Projects (`/api/projects`)

- `GET /projects` – список проектов (с поддержкой query‑параметров)
- `GET /projects/:id` – проект по ID
- `POST /projects` – создать проект (только `ADMIN`)
- `DELETE /projects/:id` – удалить проект (только `ADMIN`)

#### Categories (`/api/categories`)

- `GET /categories` – список категорий
- `GET /categories/by-postId/:id` – категории по ID поста
- `POST /categories` – создать категорию
- `DELETE /categories/:id` – удалить категорию (только `ADMIN`)

#### Comments (`/api/comments`)

- `POST /comments/:postId` – добавить комментарий к посту  
  Требует авторизацию (использует `AuthGuard` и `@Authorized('userId')`).

#### Likes (`/api/likes`)

- `POST /likes/:postId` – поставить/снять лайк к посту  
  Требует авторизацию (использует `AuthGuard` и `@Authorized('userId')`).

#### Uploads (`/api/uploads`)

- `POST /uploads` – загрузка файла (через `FileInterceptor('file')`)
- Файлы сохраняются в `backend/uploads`, доступны по статическому пути `/uploads/...`

### Swagger / OpenAPI

- Swagger UI: `http://<SERVER_HOST>:<SERVER_PORT>/api`
- JSON‑описание схемы: `http://<SERVER_HOST>:<SERVER_PORT>/api/openapi.json`
- DTO и ответы размечены через `@ApiProperty`, что даёт полное описание в документации.

---

## Frontend (Next.js App Router)

### Обзор

Frontend реализован в `frontend/` на базе Next.js (App Router) и TypeScript, с разделением на:

- `app/` – маршруты и страницы
- `src/entities/` – сущности (Post, Project, Category, Comment и их UI‑компоненты)
- `src/features/` – функциональные блоки (формы, фильтры, лайки, пагинация и т.д.)
- `src/widgets/` – сложные композиции (списки постов, проекты, хедер/футер, текстовый редактор)
- `src/shared/` – API‑клиенты, хуки, типы, константы, вспомогательные функции, глобальные UI‑компоненты


### Страницы (App Router)

#### Главная (`/`)

Файл: `frontend/app/page.tsx`

- Отображает:
  - `Hero` – крупный баннер/приветственный блок.
  - `RecentPostsList` – список последних постов.
  - `AllPostsList` – общий список постов.

#### Блог

- `/blog` (`frontend/app/blog/page.tsx`)
  - Заголовок/метаданные: «TiBlog | Все посты».
  - Компоненты:
    - `PostsSort` – сортировка постов.
    - `Filters` – фильтры по категориям/другим параметрам.
    - `AllPostsList limit={9}` – пагинированный список постов.
- `/blog/[id]` (`frontend/app/blog/[id]/page.tsx`)
  - Детальная страница поста:
    - `BigPostItem` – контент поста, превью, метаинформация.
    - `SimillarPostsList` – похожие посты.

#### Проекты

- `/projects` (`frontend/app/projects/page.tsx`)
  - Большой заголовок «Проекты».
  - `Filters` – фильтрация по категориям/стеку.
  - `ProjectsList` – список проектов.
- `/projects/[id]` (`frontend/app/projects/[id]/page.tsx`)
  - Детальная страница проекта:
    - `BigProjectItem` – детальное описание, стек, категории.

#### Страница «Обо мне»

- `/about` (`frontend/app/about/page.tsx`) – информация об авторе (Тимур, опыт, контакты/описание; содержимое можно изменять в этом файле).

#### Аутентификация

- `/auth/login` (`frontend/app/auth/login/page.tsx`)
  - `AuthForm type="login"` – форма входа (email + пароль).
- `/auth/register` (`frontend/app/auth/register/page.tsx`)
  - `AuthForm type="register"` – форма регистрации.

Marshrutизация доступа для auth/admin реализована через `frontend/proxy.ts` (см. раздел ниже).

#### Админ‑панель

Админка доступна только пользователям с ролью `ADMIN` (проверка в `proxy.ts` по `accessToken`).

- `/admin` (`frontend/app/admin/page.tsx`)
  - Большой заголовок «Админка».
  - Три плитки‑ссылки:
    - `/admin/projects` – проекты.
    - `/admin/posts` – посты.
    - `/admin/categories` – категории.

- `/admin/posts` (`frontend/app/admin/posts/page.tsx`)
  - `AllPostsList isAdminPage={true}` – список постов с возможностью управления (например, удаления).
  - `AddPost` – форма создания поста.

- `/admin/projects` (`frontend/app/admin/projects/page.tsx`)
  - `ProjectsList isAdminPage={true}` – список проектов с управлением.
  - `AddProject` – форма создания проекта.

- `/admin/categories` (`frontend/app/admin/categories/page.tsx`)
  - `CategoriesList` – список категорий.
  - `AddCategoryForm` – форма создания новой категории.

### Слои фронтенда

#### `src/entities`

- `Post` – компоненты:
  - `BigPostItem`, `PostItem`, `PostItemWrapper`, `BigPostControls`
- `Project` – компоненты:
  - `BigProjectItem`
- `Category`
  - `CategoryItem`
- `Comment`
  - `CommentItem`

Эти компоненты отвечают за отображение конкретных доменных сущностей.

#### `src/features`

Функциональные блоки (формы, интерактивные элементы):

- `AddPost`, `AddProject`, `AddCategoryForm`, `AddCommentForm`
- `LikeButton` – постановка/снятие лайка
- `Filters` – фильтрация постов/проектов
- `PostsSort` – сортировка постов
- `Pagination` – пагинация
- `CategorySelect` – выбор категории
- `ThemeChangeButton` – переключатель темы
- `UploadFile` – загрузка файлов

#### `src/widgets`

Крупные композитные блоки:

- `Header` / `Footer` / `Hero`
- `AllPostsList`, `RecentPostsList`, `SimillarPostsList`
- `ProjectsList`, `CategoriesList`
- `AuthForm` – форма login/register
- `AddPost`, `AddProject`, `TextEditor` (на базе TipTap)

#### `src/shared`

**API‑клиенты** (`src/shared/api/*.api.ts`):

- `auth.api.ts` – логин/регистрация/refresh.
- `posts.api.ts` – получение и создание постов:

- `projects.api.ts`, `categories.api.ts`, `comments.api.ts`, `likes.api.ts`, `uploads.api.ts`, `users.api.ts` – обертки над соответствующими backend‑эндпоинтами.

**Axios‑инстанс и авторизация** (`src/shared/libs/axiosInstance.ts`):

- `baseURL` берётся из `process.env.NEXT_PUBLIC_SERVER_URL`.
- `withCredentials: true` – для передачи cookies (refresh токен).
- В `request`‑интерцепторе токен `accessToken` берётся из cookie (через `js-cookie`) и прокидывается в `Authorization: Bearer ...`.
- В `response`‑интерцепторе:
  - При ответе `401` и отсутствии `_retry`:
    - Выполняется `POST auth/refresh`.
    - В cookie сохраняется новый `accessToken`.
    - Повторяется исходный запрос.
  - Есть очередь запросов `failedQueue` для случаев нескольких параллельных 401.

**Хуки** (`src/shared/hooks`):

- `useAuth`, `usePosts`, `useProjects`, `useCategories`, `useComments`, `useLikes`, `useUploads`, `useUsers`, `useDelete` – обёртки над API с управлением состоянием загрузки/ошибок и бизнес‑логикой.

**Схемы валидации** (`src/shared/schemas`):

- `login.schema.ts`, `register.schema.ts`, `addCategory.schema.ts`, `addComment.schema.ts` – описания форм для фронтенда (например, через Zod/Yup – зависит от реализации внутри).

**Типы** (`src/shared/types`):

- Генерируются преимущественно из OpenAPI через `orval` (см. `frontend/orval.config.ts`), дополняются ручными типами.

## OpenAPI и генерация типов (orval)

В `frontend/orval.config.ts` настроена генерация типов и клиентов на основе OpenAPI:

- `input: process.env.NEXT_PUBLIC_OPENAPI_URL` – URL до `openapi.json` backend’а.
- `output.schemas: "./src/shared/types"` – папка с генерируемыми типами.

Это позволяет:

- Иметь строго типизированные DTO и ответы (PostRequest, PostResponse, ProjectRequest, ProjectResponse и т.д.).
- Синхронизировать frontend и backend по контракту API.

---

## Запуск и окружение

### Переменные окружения (пример)

**Backend (`backend/.env`):**

- `SERVER_PORT` – порт сервера (например, `5000`)
- `DATABASE_URL` – строка подключения к PostgreSQL
- `CLIENT_URL` – список разрешённых origin’ов через запятую (например, `http://localhost:3000`)
- `JWT_SECRET` – секрет для подписания JWT
- `JWT_ACCESS_TOKEN_TTL` – время жизни access‑токена (например, `15m`)
- `JWT_REFRESH_TOKEN_TTL` – время жизни refresh‑токена (например, `7d`)
- `COOKIE_DOMAIN` – домен для refresh‑cookie (в dev можно оставить `localhost` или не задавать)

**Frontend (`frontend/.env.local`):**

- `NEXT_PUBLIC_SERVER_URL` – базовый URL backend API (например, `http://localhost:5000/api/`)
- `NEXT_PUBLIC_OPENAPI_URL` – URL до OpenAPI схемы (например, `http://localhost:5000/api/openapi.json`)
- `JWT_SECRET` – тот же секрет, что на backend, для декодирования `accessToken` в `proxy.ts` (в dev можно продублировать).

### Запуск backend

```bash
cd backend
yarn install        # или npm install

# development
yarn start:dev

# production
yarn build
yarn start:prod
```

Prisma:

- Миграции/генерация клиента (пример, если ещё не выполнялись):

```bash
yarn prisma migrate dev
yarn prisma generate
```

### Запуск frontend

```bash
cd frontend
npm install         # или yarn / pnpm / bun

npm run dev         # или yarn dev
```

Приложение будет доступно по адресу `http://localhost:3000` (по умолчанию).


## Админ‑функциональность

Функции, доступные только Admin‑пользователю:

- Создание/удаление **постов**.
- Создание/удаление **проектов**.
- Создание/удаление **категорий**.

Контроль осуществляется:

- На backend – через `AuthGuard` + `RolesGuard` и `@Roles([ERole.ADMIN])`.
- На frontend – через middleware `proxy.ts` (редиректы по `accessToken`).

