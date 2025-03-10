import { test, expect } from '@playwright/test';

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
  '/hokey-cokey-in-virtual-reality/blog/about/memes/adventure/',
  '/hokey-cokey-in-virtual-reality/blog/about/memes/',
  '/hokey-cokey-in-virtual-reality/blog/about/',
  '/hokey-cokey-in-virtual-reality/memes/memes/blog',
  '/hokey-cokey-in-virtual-reality/memes/memes/adventure/',
  '/hokey-cokey-in-virtual-reality/memes/memes/memes/',
];

test.describe('404 Not Found Tests', () => {
  for (const path of invalidPaths) {
    test(`should return 404 for non-existent page ${path}`, async ({
      page,
    }) => {
      const response = await page.goto(`${path}`);

      // Verify status code is 404
      expect(response?.status()).toBe(404);
    });
  }
});
