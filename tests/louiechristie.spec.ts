import { test, expect } from "@playwright/test";

const homepageAddresses = [
  // https
  "https://www.louiechristie.com/",
  "https://www.louiechristie.com",

  "https://louiechristie.com/",
  "https://louiechristie.com",

  // http

  "http://www.louiechristie.com/",
  "http://www.louiechristie.com",

  "http://louiechristie.com/",
  "http://louiechristie.com",
];

test("has title", async ({ page }) => {
  await page.goto("https://www.louiechristie.com/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    /Louie Christie: Adventurous | Tech Geek | Underground Comedian in my own head 😬 -> Homepage/
  );
});

test("has heading", async ({ page }) => {
  await page.goto("https://www.louiechristie.com/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Louie Christie" })
  ).toBeVisible();
});

homepageAddresses.forEach((address) => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      await page.goto(address);
    });
    test(`testing with ${address}, title`, async ({ page }) => {
      await expect(page).toHaveTitle(
        /Louie Christie: Adventurous | Tech Geek | Underground Comedian in my own head 😬 -> Homepage/
      );
    });
    test(`testing with ${address}, heading`, async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Louie Christie"
      );
    });

    test(`testing with ${address}, url`, async ({ page }) => {
      await expect(page).toHaveURL("https://www.louiechristie.com/");
    });
  });
});
