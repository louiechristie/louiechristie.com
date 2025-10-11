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
    test(`should return 404 for malformed URL ${path}`, async ({
      page,
      baseURL,
    }) => {
      try {
        const response = await page.goto(`${path}`);
        expect(response?.status()).toBe(404);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toMatch('net::ERR_NAME_NOT_RESOLVED');
        }
      }
    });
  });

  test.describe('malformed url paths should be Not Found', () => {
    const path = '/./dot-segments/../invalid';
    test(`should return 404 for malformed URL ${path}`, async ({
      page,
      baseURL,
    }) => {
      const response = await page.goto(`${path}`);
      await page.waitForURL(`${baseURL}invalid`);

      expect(response?.status()).toBe(404);
    });
  });
}
