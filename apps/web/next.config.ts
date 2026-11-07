import type { NextConfig } from "next";

// Валидация env при старте dev/build: забытая переменная = понятная ошибка сразу
import { env } from "./src/env";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  cacheComponents: true,
  // Фронт и бэк для браузера — один адрес: без CORS и разных URL в dev/prod.
  // Внимание: адрес вшивается при сборке, API_URL должен быть задан во время `next build`.
  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${env.API_URL}/api/v1/:path*` }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
