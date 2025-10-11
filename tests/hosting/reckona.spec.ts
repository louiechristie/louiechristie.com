import { test, expect } from '@playwright/test';

const redirectFrom = 'https://www.reckona.com/';
const heading = 'The Recruitment Calculator';

const redirectTo = 'https://www.reckona.co.uk/';

const removeTrailingSlash = (string: string) => {
  const regexTrailingSlash = new RegExp('/$');
  return string.replace(regexTrailingSlash, '');
};

const removeWww = (string) => {
  const url = new URL(string);
  return url.protocol + '//' + url.hostname.replace(/www./, '') + '/';
};

const removeSecure = (string) => {
  return string.replace('https', 'http');
};

const isProduction = !!process.env.CI;

if (isProduction) {
  test(`removeTrailingSlash`, async ({ page }) => {
    expect(removeTrailingSlash(redirectFrom).toString()).toBe(
      'https://www.reckona.com'
    );
  });

  test(`removeWww`, async ({ page }) => {
    expect(removeWww(redirectFrom).toString()).toBe('https://reckona.com/');
  });

  test(`removeSecure`, async ({ page }) => {
    expect(removeSecure(redirectFrom).toString()).toBe(
      'http://www.reckona.com/'
    );
  });

  const redirectFromes = [
    // https
    redirectFrom,
    removeTrailingSlash(redirectFrom),
    removeWww(redirectFrom),
    removeTrailingSlash(removeWww(redirectFrom)),

    // http
    removeSecure(redirectFrom),
    removeSecure(removeTrailingSlash(redirectFrom)),
    removeSecure(removeWww(redirectFrom)),
    removeSecure(removeTrailingSlash(removeWww(redirectFrom))),
  ];

  test(`click from louiechristie.com to reckona.co.uk`, async ({ page }) => {
    await page.goto('https://www.louiechristie.com/tech/experiments/');

    const link = page.getByText('Reckona', { exact: true });

    await expect(link).toBeVisible();

    await link.click();

    await page.waitForURL('https://www.reckona.co.uk/');
  });
}
