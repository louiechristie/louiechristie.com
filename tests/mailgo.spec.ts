import { test, expect } from "@playwright/test";

test.describe('mailgo script', () => {
  test('voicemail link', async ({ page }) => {
    await page.goto('https://www.louiechristie.com');
    
    const toggler = page.getByText('Voicemail', { exact: true });

    // Ensure the button is visible
    await expect(toggler).toBeVisible();

    // Click the navbar toggler
    await toggler.click();
    
    // Check the popup heading
    await expect(
      page.getByText('call as default')
    ).toBeVisible();
  });
});