# Архитектура

```
браузер → web (Next.js, :3000) ──/api/v1/*──► api (ASP.NET Core 10, :5080) ──► PostgreSQL 17 (:5432)
```

- **Frontend**: Next.js (`apps/web`), деплой — Docker-образ (standalone output).
- **Backend**: ASP.NET Core 10 Minimal API (`apps/api`), Docker-образ `apps/api/Dockerfile`. Решение: [ADR 0001](adr/0001-backend-dotnet-postgres.md).
- **Данные**: PostgreSQL 17, EF Core (Npgsql), контекст `apps/api/src/Api/Data/AppDbContext.cs`.
- **Health**: `/api/v1/health` — процесс жив; `/api/v1/health/ready` — плюс доступна БД.
- **Окружение разработки**: Dev Container (`.devcontainer/`) — инструменты + Postgres.
- **Локально прод-образы**: `docker compose up --build` (web + api + db).
