import { expect, test } from "@playwright/test";

test("index page has waving hand", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("👋");
});
