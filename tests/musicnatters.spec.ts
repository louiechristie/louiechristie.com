import { test, expect } from '@playwright/test';

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
const urls = [
  'https://www.youtube.com/@music.natters',
  'https://consent.youtube.com/m?continue=https%3A%2F%2Fm.youtube.com%2F%40music.natters%3Fcbrd%3D1&gl=GB&m=1&pc=yt&cm=2&hl=en&src=1',
  'https://consent.youtube.com/m?continue=https%3A%2F%2Fwww.youtube.com%2F%40music.natters%3Fcbrd%3D1&gl=GB&m=0&pc=yt&cm=2&hl=en&src=1',
];

addresses.forEach((address) => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      await page.goto(address);
    });

    test(`testing with ${address}, url`, async ({ page }) => {
      await expect(urls).toContain(page.url());
    });
  });
});
