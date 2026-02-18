---
name: debug-db
description: "Отладка данных в PostgreSQL — проверка состояния БД, поиск аномалий, анализ связей между таблицами."
---

# Отладка данных через PostgreSQL MCP

## Когда использовать
- Отладка данных в базе данных
- Проверка состояния и структуры БД
- Поиск аномалий и проблемных записей
- Анализ связей между таблицами

## Как работать
1. Получи контекст проблемы от пользователя
2. Сформулируй SQL-запрос для диагностики
3. Выполни запрос через PostgreSQL MCP (инструмент `query`)
4. Интерпретируй результаты и предложи решение

## Примеры запросов

### Проверка структуры таблицы
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Todo';
```

### Поиск задач без описания
```sql
SELECT id, title, status, "userId" FROM "Todo" WHERE description IS NULL OR description = '';
```

### Статистика по статусам
```sql
SELECT status, COUNT(*) as count FROM "Todo" GROUP BY status;
```

### Задачи зависшие в PENDING больше 7 дней
```sql
SELECT t.id, t.title, t."updatedAt", u.name as user_name
FROM "Todo" t JOIN "User" u ON t."userId" = u.id
WHERE t.status = 'PENDING' AND t."updatedAt" < NOW() - INTERVAL '7 days';
```

### Проверка пользователя и его задач
```sql
SELECT u.name, u.email, COUNT(t.id) as todo_count
FROM "User" u LEFT JOIN "Todo" t ON u.id = t."userId"
GROUP BY u.id, u.name, u.email;
```

## Важно
- Используй только SELECT-запросы для диагностики
- Для изменения данных спроси подтверждение у пользователя
- Имена таблиц и колонок в Prisma используют camelCase в кавычках
