# Как работаем

1. Ветка от `main`: `feat/<кратко>` или `fix/<кратко>`.
2. Коммиты по Conventional Commits: `feat(web): ...`, `fix(api): ...`.
   Pre-commit прогоняет Prettier по изменённым файлам, commit-msg — commitlint.
3. Перед PR: `pnpm check`.
4. PR в `main`, заполнить шаблон, дождаться зелёного CI. Merge — squash.

## Настройка репозитория на GitHub (один раз)

- Settings → Branches → защита `main`: require PR, require status checks (`check`, `commitlint`).
- Settings → General → разрешить только squash merge.
- Settings → Actions → Workflow permissions: read and write (для публикации в GHCR).

## Vercel preview (один раз)

1. `pnpm dlx vercel link` в корне → создать проект, Root Directory: `apps/web`.
2. ID взять из `.vercel/project.json`, токен — vercel.com/account/tokens.
3. GitHub → Settings → Secrets → Actions: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
4. В Vercel → Settings → Environment Variables задать переменные из `.env.example`.
5. Отключить в Vercel автодеплой из Git (Settings → Git), чтобы не было двойных деплоев — или наоборот, оставить его и удалить `preview.yml`.

## Релизы

release-please сам открывает PR «chore(main): release x.y.z» с changelog. Merge → тег `vX.Y.Z` → Docker-образ с этим тегом.
Чтобы теги от release-please запускали `docker.yml`, нужен PAT в секрете вместо `GITHUB_TOKEN` (ограничение GitHub) — либо собирать образ вручную через `workflow_dispatch`.
