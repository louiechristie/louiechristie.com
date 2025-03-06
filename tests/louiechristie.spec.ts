import { test, expect } from '@playwright/test';

const homepageAddresses = [
  // https
  'https://www.louiechristie.com/',
  'https://www.louiechristie.com',

  'https://louiechristie.com/',
  'https://louiechristie.com',

  // http

  'http://www.louiechristie.com/',
  'http://www.louiechristie.com',

  'http://louiechristie.com/',
  'http://louiechristie.com',
];

test('has title', async ({ page }) => {
  await page.goto('https://www.louiechristie.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    /Louie Christie: Adventurous | Tech Geek | Underground Comedian in my own head 😬 -> Homepage/
  );
});

test('has heading', async ({ page }) => {
  await page.goto('https://www.louiechristie.com/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Louie Christie' })
  ).toBeVisible();
});

homepageAddresses.forEach((address) => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      await page.goto(address);
    });
    test(`testing with ${address}, title`, async ({ page }) => {
      await expect(page).toHaveTitle(
        /Louie Christie: Adventurous | Tech Geek | Underground Comedian in my own head 😬 -> Homepage/
      );
    });
    test(`testing with ${address}, heading`, async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        'Louie Christie'
      );
    });

    test(`testing with ${address}, url`, async ({ page }) => {
      await expect(page).toHaveURL('https://www.louiechristie.com/');
    });
  });
});

test.describe('404 Not Found Tests', () => {
  test('should return 404 for non-existent pages', async ({ page }) => {
    // Test various invalid paths
    const invalidPaths = [
      '/this-page-does-not-exist',
      '/invalid/route/123',
      '/api/nonexistent',
      '/assets/missing-image.jpg',
      '/not-valid',
      '/debugging-the-right-way',
      '/2008/07/20/possibly-the-worlds-most-user-friendly-dvd-menu/adventure/blog/2021/02/19/you-computer-geeks-are-all-the-same/memes/',
      '/about/memes/memes/memes/',
      '/hokey-cokey-in-virtual-reality/blog/about/blog',
      '/hokey-cokey-in-virtual-reality/blog/about/blog',
      '/hokey-cokey-in-virtual-reality/blog/about/memes/adventure/',
      '/hokey-cokey-in-virtual-reality/blog/about/memes/',
      '/hokey-cokey-in-virtual-reality/blog/about/',
      '/hokey-cokey-in-virtual-reality/memes/memes/blog',
      '/hokey-cokey-in-virtual-reality/memes/memes/adventure/',
      '/hokey-cokey-in-virtual-reality/memes/memes/memes/',
    ];

    for (const path of invalidPaths) {
      const response = await page.goto(`${path}`);

      // Verify status code is 404
      expect(response?.status()).toBe(404);
    }
  });

  if (process.env.CI) {
    test('should return 404 for malformed URLs', async ({ page }) => {
      const malformedPaths = [
        '/%invalid-encoding',
        '/////multiple-slashes',
        '/./dot-segments/../invalid',
      ];

      for (const path of malformedPaths) {
        const response = await page.goto(`${path}`);
        expect(response?.status()).toBe(404);
      }
    });
  }
});
