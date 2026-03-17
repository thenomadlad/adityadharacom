import { expect, test } from "@playwright/test";

test("mermaid diagram is rendered", async ({ page }) => {
  await page.goto("/blog/hotw-002-server-driven-mui");
  await expect(page.locator("code.language-mermaid svg")).toBeVisible();
});

test.describe("blog post typography", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/my-site-runs-on-astro");
  });

  test("h1 title is bold", async ({ page }) => {
    const fontWeight = await page
      .locator("article h1")
      .first()
      .evaluate((el) => parseInt(window.getComputedStyle(el).fontWeight));

    expect(fontWeight).toBeGreaterThanOrEqual(700);
  });

  test("h2 section headings are bold", async ({ page }) => {
    const fontWeight = await page
      .locator("article h2")
      .first()
      .evaluate((el) => parseInt(window.getComputedStyle(el).fontWeight));

    expect(fontWeight).toBeGreaterThanOrEqual(700);
  });

  test("paragraph text is not bold", async ({ page }) => {
    const fontWeight = await page
      .locator("article p")
      .first()
      .evaluate((el) => parseInt(window.getComputedStyle(el).fontWeight));

    expect(fontWeight).toBeLessThan(700);
  });

  test("font size hierarchy: h1 > h2 > p", async ({ page }) => {
    const article = page.locator("article");

    const [h1Size, h2Size, pSize] = await Promise.all([
      article
        .locator("h1")
        .first()
        .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize)),
      article
        .locator("h2")
        .first()
        .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize)),
      article
        .locator("p")
        .first()
        .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize)),
    ]);

    expect(h1Size).toBeGreaterThan(h2Size);
    expect(h2Size).toBeGreaterThan(pSize);
  });
});
