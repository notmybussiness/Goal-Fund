import { expect, test } from "@playwright/test";

function tomorrowIsoDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().slice(0, 10);
}

test.describe("Onboarding flow", () => {
  test("stores goal onboarding payload in localStorage", async ({ page }) => {
    await page.goto("/onboarding/goal");

    await page.getByPlaceholder("100000000").fill("1000000");
    await page.locator('input[type="date"]').fill(tomorrowIsoDate());
    await page.getByPlaceholder("1200000").fill("100000");
    await page.locator('form button[type="submit"]').click();

    await expect
      .poll(async () => {
        return page.evaluate(() => window.localStorage.getItem("goal-onboarding-form"));
      })
      .toContain("\"targetAmount\":\"1000000\"");
  });

  test("stores portfolio onboarding payload in localStorage", async ({ page }) => {
    await page.goto("/onboarding/portfolio");

    await page.getByPlaceholder("BTC / AAPL / 069500").fill("btc");
    await page.getByPlaceholder("15000000").fill("15000000");
    await page.locator('form button[type="submit"]').click();

    await expect
      .poll(async () => {
        return page.evaluate(() => window.localStorage.getItem("portfolio-onboarding-form"));
      })
      .toContain("\"symbol\":\"BTC\"");
  });
});
