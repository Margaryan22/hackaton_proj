import { expect, test } from "@playwright/test";

test("главная страница открывается", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hackathon" })).toBeVisible();
});

test("healthcheck отвечает ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBe(true);
  expect(await res.json()).toEqual({ status: "ok" });
});

test("бэкенд доступен через фронт и видит базу", async ({ request }) => {
  const res = await request.get("/api/v1/health/ready");
  expect(res.ok()).toBe(true);
  expect(await res.text()).toBe("Healthy");
});
