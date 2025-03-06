import { test, expect } from '@playwright/test';

const malformedPaths = [
  '/%invalid-encoding',
  '/////multiple-slashes',
  '/./dot-segments/../invalid',
];

if (process.env.CI) {
  test.describe('malformed url paths should be Not Found', () => {
    for (const path of malformedPaths) {
      test(`should return 404 for malformed URL ${path}`, async ({ page }) => {
        const response = await page.goto(`${path}`);
        expect(response?.status()).toBe(404);
      });
    }
  });
}
