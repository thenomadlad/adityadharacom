import { expect, test } from "@playwright/test";

test("index page has waving hand", async ({ page }) => {
  await page.goto("/");
  expect(await page.textContent(".hand")).toBe("👋");
});
