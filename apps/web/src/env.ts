import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Единая точка доступа к переменным окружения.
 * Добавляя переменную: опиши её здесь, в runtimeEnv и в корневом .env.example.
 * Используй `env.X` вместо `process.env.X`.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // Адрес бэкенда (.NET). Запросы /api/v1/* проксируются туда — см. next.config.ts
    API_URL: z.url().default("http://localhost:5080"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // SKIP_ENV_VALIDATION=1 — для сборки Docker-образа/линта без реальных секретов
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
