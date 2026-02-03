import { test, expect } from "@playwright/test";

test.describe("Counter Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display counter with initial value 0", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Counter" })).toBeVisible();
    await expect(page.getByTestId("counter-value")).toHaveText("0");
  });

  test("should increment when + button is clicked", async ({ page }) => {
    await page.getByRole("button", { name: "+", exact: true }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("1");
  });

  test("should decrement when - button is clicked", async ({ page }) => {
    await page.getByRole("button", { name: "+", exact: true }).click();
    await page.getByRole("button", { name: "+", exact: true }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("2");

    await page.getByRole("button", { name: "-" }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("1");
  });

  test("should not go below 0", async ({ page }) => {
    await page.getByRole("button", { name: "-" }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("0");
  });

  test("should increment by 10 when +10 button is clicked", async ({ page }) => {
    await page.getByRole("button", { name: "+10" }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("10");
  });

  test("should increment by 10 multiple times", async ({ page }) => {
    await page.getByRole("button", { name: "+10" }).click();
    await page.getByRole("button", { name: "+10" }).click();
    await expect(page.getByTestId("counter-value")).toHaveText("20");
  });
});
