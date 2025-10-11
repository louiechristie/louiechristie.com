import { test, expect } from '@playwright/test';

const isProduction = !!process.env.CI;

const homepageAddresses = [
  // .club

  // https
  'https://www.showerofcomedy.club/',
  'https://www.showerofcomedy.club',

  'https://showerofcomedy.club/',
  'https://showerofcomedy.club',

  // http
  'http://www.showerofcomedy.club/',
  'http://www.showerofcomedy.club',

  'http://showerofcomedy.club/',
  'http://showerofcomedy.club',

  // .com

  // https
  'https://www.showerofcomedy.com/',
  'https://www.showerofcomedy.com',

  'https://showerofcomedy.com/',
  'https://showerofcomedy.com',

  // http

  'http://www.showerofcomedy.com/',
  'http://www.showerofcomedy.com',

  'http://showerofcomedy.com/',
  'http://showerofcomedy.com',
];

const title = 'Shows - Shower of Comedy';
const heading = 'Underground stand-up comedy';
const url = 'https://www.showerofcomedy.club/';

if (isProduction) {
  homepageAddresses.forEach((address) => {
    test.beforeEach(async ({ page }) => {
      await page.goto(address);
    });
    test(`testing with ${address}, title`, async ({ page }) => {
      await expect(page).toHaveTitle(title);
    });
    test(`testing with ${address}, heading`, async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    });

    test(`testing with ${address}, url`, async ({ page }) => {
      await expect(page).toHaveURL(url);
    });
  });
}
