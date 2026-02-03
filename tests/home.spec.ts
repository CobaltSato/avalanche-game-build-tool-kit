import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load and display the page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Next/i);
  });

  test("should display navigation cards", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Docs" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Learn" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Templates" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Deploy" })).toBeVisible();
  });

  test("should have correct link targets", async ({ page }) => {
    await page.goto("/");

    const docsLink = page.getByRole("link", { name: /Docs/ });
    await expect(docsLink).toHaveAttribute(
      "href",
      /nextjs\.org\/docs/
    );

    const learnLink = page.getByRole("link", { name: /Learn/ });
    await expect(learnLink).toHaveAttribute(
      "href",
      /nextjs\.org\/learn/
    );
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });
});
