#!/usr/bin/env bash
# Ставит всё нужное для разработки одной командой: Node 24, pnpm, зависимости, браузер для e2e, .env.
# macOS — через Homebrew, Windows — через winget (запускать в Git Bash).
# Запуск из корня репозитория: bash scripts/setup.sh
# Повторный запуск безопасен: уже установленное пропускается.
set -euo pipefail
cd "$(dirname "$0")/.."

case "$(uname -s)" in
  Darwin) OS=mac ;;
  MINGW* | MSYS* | CYGWIN*) OS=win ;;
  Linux) OS=linux ;;
  *) OS=other ;;
esac

say() { printf '\n▶ %s\n' "$1"; }
has() { command -v "$1" >/dev/null 2>&1; }

pkg() { # $1 — команда, $2 — пакет brew, $3 — пакет winget
  has "$1" && return 0
  case "$OS" in
    mac)
      has brew || { echo "❌ Нужен Homebrew: https://brew.sh"; exit 1; }
      brew install "$2" ;;
    win)
      winget.exe install -e --id "$3" --accept-source-agreements --accept-package-agreements
      echo "⚠️  Установлен $1. Перезапусти Git Bash и запусти скрипт снова, чтобы обновился PATH."
      exit 0 ;;
    *) echo "❌ Поставь $1 вручную и запусти скрипт снова"; exit 1 ;;
  esac
}

say "Node.js 24"
need_node=1
if has node; then
  major="$(node -p 'process.versions.node.split(".")[0]')"
  [ "$major" -ge 24 ] && need_node=0 || echo "Сейчас Node $major, нужен 24+"
fi
if [ "$need_node" = 1 ]; then
  case "$OS" in
    mac) has brew || { echo "❌ Нужен Homebrew: https://brew.sh"; exit 1; }
      brew install node@24 && brew link --overwrite --force node@24 ;;
    win) pkg __node24__ "" OpenJS.NodeJS.LTS ;;
    *) echo "❌ Поставь Node 24 (например, через nvm) и запусти снова"; exit 1 ;;
  esac
fi
node -v

say "pnpm"
if ! has pnpm; then
  corepack enable 2>/dev/null || npm install -g corepack && corepack enable
fi
pnpm -v

say "Зависимости"
pnpm install

say "Браузер для e2e-тестов"
pnpm --filter @hackathon/web exec playwright install chromium

say "Переменные окружения"
if [ -f apps/web/.env.local ]; then echo "apps/web/.env.local уже есть"
else cp .env.example apps/web/.env.local && echo "Создан apps/web/.env.local"; fi

if ls apps/*/*.csproj >/dev/null 2>&1 && ! has dotnet; then
  say ".NET SDK для бэкенда"
  if [ "$OS" = mac ]; then brew install --cask dotnet-sdk; else pkg dotnet "" Microsoft.DotNet.SDK.10; fi
fi

printf '\n✅ Готово. Запуск: pnpm dev → http://localhost:3000\n'
