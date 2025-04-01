import { test, expect } from '@playwright/test';
import { urls } from './musicnattersTestUtils.ts';

const addresses = [
  // https
  'https://www.musicnatters.com/',
  'https://www.musicnatters.com',

  'https://musicnatters.com/',
  'https://musicnatters.com',

  // http
  'http://www.musicnatters.com/',
  'http://www.musicnatters.com',

  'http://musicnatters.com/',
  'http://musicnatters.com',
];

const title = 'Music Natters Podcast - YouTube';
const heading = 'Music Natters Podcast';

const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

if (isProduction) {
  addresses.forEach((address) => {
    test.describe('variations', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(address);
      });

      test(`testing with ${address}, url`, async ({ page }) => {
        await expect(urls).toContain(page.url());
      });
    });
  });
}
