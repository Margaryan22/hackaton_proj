# 0001. Бэкенд на .NET 10 + PostgreSQL, разработка в Dev Container

- Статус: принято
- Дата: 2026-11-07

## Контекст

Нужен бэкенд к фронтенду на Next.js. Команда пишет на C#. Большинство разработчиков на Windows,
часть на macOS — окружение должно быть одинаковым у всех и в CI.

## Решение

- **Бэкенд**: ASP.NET Core 10 Minimal API, `apps/api` (решение `Api.slnx`, тесты на xUnit).
- **БД**: PostgreSQL 17, доступ через EF Core (Npgsql).
- **Связка с фронтом**: Next.js проксирует `/api/v1/*` на бэкенд (`rewrites` в `next.config.ts`).
  Для браузера один адрес — нет CORS, нет разных URL в dev/prod. Адрес бэка (`API_URL`) вшивается при сборке фронта.
- **Окружение**: Dev Container (`.devcontainer/`) на docker-compose: контейнер с инструментами + Postgres.
  Приложение живёт в сети базы, поэтому БД везде — `localhost:5432`. Работает в Docker Desktop и GitHub Codespaces.
- **Монорепо**: бэкенд — обычный пакет pnpm (`apps/api/package.json`), `pnpm dev/build/test/lint` запускают оба
  приложения через Turborepo.
- **Порты**: фронт 3000, бэк 5080 (5000 на macOS занят AirPlay), Postgres 5432. В e2e — 3100 и 5100.

## Последствия

- Нужен Docker Desktop (или Codespaces). Без контейнера — локально .NET 10 SDK и Postgres.
- CI поднимает Postgres как service-контейнер и гоняет e2e через всю цепочку браузер → фронт → бэк → БД.
- Смена адреса бэка требует пересборки фронта.
- Миграции EF Core — в `apps/api/src/Api/Migrations`, создаются `dotnet ef migrations add <Имя>`.
