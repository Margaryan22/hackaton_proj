# Сборка из корня репозитория: docker build -f apps/web/Dockerfile .
FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile --filter @hackathon/web...
# Реальные значения env передаются в рантайме; при сборке валидацию пропускаем
# Адрес бэкенда вшивается в прокси /api/v1/* при сборке
ARG API_URL=http://localhost:5080
ENV SKIP_ENV_VALIDATION=1 API_URL=$API_URL
RUN pnpm --filter @hackathon/web build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /repo/apps/web/.next/standalone ./
COPY --from=build --chown=app:app /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=app:app /repo/apps/web/public ./apps/web/public
USER app
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
