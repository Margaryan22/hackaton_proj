import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const API_PORT = Number(process.env.E2E_API_PORT ?? 5100);
const API_URL = `http://localhost:${API_PORT}`;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Если задан E2E_BASE_URL (например, preview-деплой) — сервер не поднимаем
  // Если задан E2E_BASE_URL (например, preview-деплой) — серверы не поднимаем.
  // Иначе поднимаем бэкенд (.NET, нужен Postgres) и фронт, который проксирует /api/v1/* на бэкенд.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : [
        {
          command: `dotnet run --project ../api/src/Api --no-launch-profile --urls ${API_URL}`,
          url: `${API_URL}/api/v1/health`,
          reuseExistingServer: !isCI,
          env: { ASPNETCORE_ENVIRONMENT: "Development" },
          timeout: 180_000,
        },
        {
          // В CI — прод-сборка (собирается заранее с API_URL на этот же порт), локально — dev-сервер
          command: isCI
            ? `node .next/standalone/apps/web/server.js`
            : `pnpm exec next dev --port ${PORT}`,
          url: `http://localhost:${PORT}/api/health`,
          reuseExistingServer: !isCI,
          env: {
            PORT: String(PORT),
            NEXT_PUBLIC_APP_URL: `http://localhost:${PORT}`,
            API_URL,
          },
          timeout: 120_000,
        },
      ],
});
