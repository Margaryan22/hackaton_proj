# Hackathon

## Быстрый старт

### Вариант 1 — Dev Container (рекомендуется, особенно на Windows)

Нужны Docker Desktop и VS Code с расширением **Dev Containers**.
Открой папку проекта в VS Code → **Reopen in Container**. Всё остальное (Node 24, pnpm, .NET 10,
Postgres, зависимости, браузер для e2e) поставится внутри контейнера само.
`pnpm dev` запускает фронт (http://localhost:3000) и бэкенд (http://localhost:5080) вместе.

Без Docker — то же самое в облаке: **Code → Codespaces → Create codespace on main**.

### Вариант 2 — локально

Одной командой (macOS — Terminal, Windows — Git Bash):

```bash
bash scripts/setup.sh   # Node 24, pnpm, зависимости, браузер для e2e, .env
pnpm dev
```

Вручную:

```bash
nvm use            # Node 24
corepack enable    # pnpm из packageManager
pnpm install
cp .env.example apps/web/.env.local
pnpm dev
```

Открыть http://localhost:3000. Без контейнера бэкенду нужны .NET 10 SDK и Postgres на `localhost:5432`.
Healthcheck: фронт — `/api/health`, бэкенд — `/api/v1/health`, бэкенд + БД — `/api/v1/health/ready`.
Архитектура: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Скрипты

| Команда                     | Описание                                |
| --------------------------- | --------------------------------------- |
| `pnpm dev`                  | dev-режим                               |
| `pnpm build`                | сборка                                  |
| `pnpm check`                | формат + линт + типы + тесты (как в CI) |
| `pnpm test`                 | тесты с отчётом о покрытии              |
| `pnpm format`               | Prettier                                |
| `docker compose up --build` | прод-образы локально: web + api + db    |

## Правила

- В `main` — только через PR: зелёный CI, одобрение владельца кода (`.github/CODEOWNERS`), все обсуждения закрыты.
- Включён auto-merge: нажми **Enable auto-merge** в PR — он смёржится сам, когда всё будет готово.
- Задачи размечаются метками: `frontend`, `backend`, `bug`, `blocked`, `priority:high`, `infra`.
- Задачи по сборке кэшируются Turborepo (`turbo.json`), повторный запуск без изменений — мгновенный.
- Уязвимости — по [SECURITY.md](SECURITY.md).

- Коммиты — [Conventional Commits](https://www.conventionalcommits.org/), проверяются commitlint.
- Подробности: [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
