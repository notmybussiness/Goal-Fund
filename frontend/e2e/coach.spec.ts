import { expect, test } from "@playwright/test";

test.describe("Coach pages", () => {
  test("renders coach dashboard page", async ({ page }) => {
    await page.goto("/coach?userId=7&goalId=9&portfolioId=11");

    await expect(page.getByRole("heading", { name: "Goal Progress" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coach Insights" })).toBeVisible();
    await expect(page.getByText("Data source:", { exact: false })).toBeVisible();
  });

  test("renders risk page", async ({ page }) => {
    await page.goto("/coach/risk");
    await expect(page.getByRole("heading", { name: "Risk Snapshot" })).toBeVisible();
  });

  test("renders simulation page", async ({ page }) => {
    await page.goto("/coach/simulation");
    await expect(page.getByRole("heading", { name: "Goal Success Simulation" })).toBeVisible();
  });

  test("renders rebalance page", async ({ page }) => {
    await page.goto("/coach/rebalance");
    await expect(page.getByRole("heading", { name: "Rebalance Proposal" })).toBeVisible();
  });
});
