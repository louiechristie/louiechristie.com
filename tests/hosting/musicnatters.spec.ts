import { test, expect } from '@playwright/test';
import { urls } from '../utils/musicnattersTestUtils.ts';

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

const isProduction = !!process.env.CI;

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

  const from = 'https://www.louiechristie.com/podcasts/';
  const to = 'https://www.youtube.com/@music.natters/';

  test(`test redirect from ${from}, to ${to}`, async ({ page }) => {
    await page.goto(from);
    await expect(urls).toContain(page.url());
  });
}
