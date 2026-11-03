# Hackathon

## Быстрый старт

```bash
nvm use            # Node 24
corepack enable    # pnpm из packageManager
pnpm install
cp .env.example apps/web/.env.local
pnpm dev
```

Открыть http://localhost:3000. Healthcheck: `/api/health`.

## Скрипты

| Команда                     | Описание                                |
| --------------------------- | --------------------------------------- |
| `pnpm dev`                  | dev-режим                               |
| `pnpm build`                | сборка                                  |
| `pnpm check`                | формат + линт + типы + тесты (как в CI) |
| `pnpm format`               | Prettier                                |
| `docker compose up --build` | запуск прод-образа локально             |

## Правила

- Коммиты — [Conventional Commits](https://www.conventionalcommits.org/), проверяются commitlint.
- Подробности: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
