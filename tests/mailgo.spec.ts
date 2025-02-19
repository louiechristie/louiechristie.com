import { test, expect } from "@playwright/test";

test.describe('mailgo script', () => {
  test('voicemail link', async ({ page }) => {
    await page.goto('https://www.louiechristie.com');
    
    const toggler = page.getByText('Voicemail', { exact: true });

    // Ensure the button is visible
    await expect(toggler).toBeVisible();

    // Click the navbar toggler
    await toggler.click();

    // Click the comedy link by its text
    await page.getByText('comedy', { exact: true }).click()
    await page.waitForURL('https://undergroundcomedian.wordpress.com/')
    
    // Check the h1 heading
    await expect(
      page.getByRole('heading', { level: 1, name: 'Underground Comedian' })
    ).toBeVisible();
  });
});