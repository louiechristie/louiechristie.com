import { test, expect } from '@playwright/test';

const malformedPaths = [
  '/%invalid-encoding',
  '/////multiple-slashes',
  '/./dot-segments/../invalid',
];

if (process.env.CI) {
  test.describe('malformed url paths should be Not Found', () => {
    const path = '/%invalid-encoding';
    test(`should return 400 for malformed URL path ${path}`, async ({
      page,
    }) => {
      const response = await page.goto(`${path}`);
      expect(response?.status()).toBe(400);
    });
  });

  test.describe('malformed url paths should be Not Found', () => {
    const path = '/////multiple-slashes';
    test(`should return 404 for malformed URL ${path}`, async ({ page }) => {
      const response = await page.goto(`${path}`);

      await page.waitForURL('/multiple-slashes');
      expect(response?.status()).toBe(404);
    });
  });

  test.describe('malformed url paths should be Not Found', () => {
    const path = '/./dot-segments/../invalid';
    test(`should return 404 for malformed URL ${path}`, async ({ page }) => {
      const response = await page.goto(`${path}`);
      await page.waitForURL('/invalid');

      expect(response?.status()).toBe(404);
    });
  });
}
