# MCP Demo: Todo App

Демонстрационный проект для курса по использованию ИИ-агентов в разработке. Todo-приложение на Next.js + Prisma + PostgreSQL с набором Claude Code скиллов, показывающих работу MCP-серверов.

## Предварительные требования

- [Docker](https://docs.docker.com/get-docker/) — для PostgreSQL
- [Node.js](https://nodejs.org/) 20+ — для Next.js
- [GitHub Personal Access Token](https://github.com/settings/tokens) — для GitHub MCP (опционально)

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Запустить PostgreSQL
docker compose up -d

# 3. Применить миграции
npx prisma migrate dev

# 4. Заполнить тестовыми данными
npx prisma db seed

# 5. Запустить приложение
npm run dev
```

Приложение будет доступно на http://localhost:3000

## Технический стек

- **Next.js 15** — App Router, Turbopack
- **Prisma 7** — ORM с PostgreSQL adapter
- **PostgreSQL 16** — база данных (Docker)
- **Tailwind CSS 4** — стилизация
- **TypeScript** — типизация

## MCP-серверы

Конфигурация MCP-серверов находится в `.mcp.json`. Три сервера:

| Сервер | Пакет | Назначение |
|--------|-------|------------|
| PostgreSQL | `@modelcontextprotocol/server-postgres` | Прямой доступ к БД для отладки |
| GitHub | `@modelcontextprotocol/server-github` | Управление issues и PRs |
| Playwright | `@playwright/mcp` | Взаимодействие с UI через браузер |

### Настройка GitHub MCP

Установите переменную окружения `GITHUB_TOKEN` с вашим Personal Access Token:

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

## Скиллы Claude Code

| Скилл | Описание |
|-------|----------|
| `debug-db` | Отладка данных через PostgreSQL MCP — SQL-запросы, поиск аномалий |
| `manage-issues` | Управление GitHub Issues — создание, просмотр, закрытие |
| `e2e-check` | Проверка UI через Playwright MCP — навигация, скриншоты |
| `full-cycle` | Сквозной сценарий — все 3 MCP вместе для полного цикла отладки |

## Примеры использования для демонстрации

### 1. Отладка данных (PostgreSQL MCP)
> "Найди все задачи, которые висят в статусе PENDING больше 7 дней"

### 2. Управление задачами (GitHub MCP)
> "Создай issue: задачи не сортируются по приоритету"

### 3. Проверка UI (Playwright MCP)
> "Открой приложение и проверь, что фильтрация по статусу работает"

### 4. Полный цикл (все MCP)
> "Пользователь жалуется, что его задачи пропали — разберись"

## Структура проекта

```
├── app/                    # Next.js App Router
│   ├── api/todos/          # CRUD API для задач
│   ├── api/users/          # API для пользователей
│   ├── layout.tsx          # Корневой layout
│   └── page.tsx            # Главная страница
├── components/             # React-компоненты
│   ├── TodoForm.tsx        # Форма создания задачи
│   ├── TodoItem.tsx        # Карточка задачи
│   └── TodoList.tsx        # Список с фильтрами
├── lib/prisma.ts           # Singleton Prisma Client
├── prisma/
│   ├── schema.prisma       # Схема БД
│   └── seed.ts             # Тестовые данные
├── .mcp.json               # Конфигурация MCP-серверов
├── .claude/skills/         # Скиллы Claude Code
├── docker-compose.yml      # PostgreSQL контейнер
└── prisma.config.ts        # Конфигурация Prisma 7
```
