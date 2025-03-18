import { test, expect } from '@playwright/test';

type Navigation = {
  text: string;
  to: string;
  expected: { h1: string } | { h1ImageAlt: string } | { h2: string };
};

const navigations: Navigation[] = [
  {
    text: 'Trivia Trundle',
    to: '/trivia-trundle/',
    expected: {
      h1: 'Trivia Trundle',
    },
  },
  {
    text: 'Newcrossities',
    to: 'https://newcrossities.com/',
    expected: {
      h1: 'Newcrossities',
    },
  },
  {
    text: 'Weather Winton',
    to: 'https://weather.louiechristie.com/',
    expected: {
      h1: 'Weather Winton',
    },
  },
  {
    text: 'Weeks To Go',
    to: '/weeks-to-go/',
    expected: {
      h1: 'Weeks To Go',
    },
  },
  {
    text: 'Reckona',
    to: 'https://www.reckona.co.uk/',
    expected: {
      h2: 'The Recruitment Calculator',
    },
  },
  {
    text: 'Creative Tech Blog',
    to: '/blog/',
    expected: {
      h1: 'Blog',
    },
  },
];

const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

test.describe('experiments links', () => {
  navigations.forEach((navigation) => {
    const { text, to, expected } = navigation;
    test.describe(`${text} link`, () => {
      test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL || 'https://www.louiechristie.com');
        await page.getByRole('link', { name: text }).click();
      });

      test(`url is ${to}`, async ({ page }) => {
        await expect(page).toHaveURL(to);
      });

      if ('h1' in expected) {
        const { h1 } = expected;
        test(`heading 1 is ${h1}`, async ({ page }) => {
          await expect(
            page.getByRole('heading', { level: 1, name: h1 })
          ).toBeVisible();
        });
      }

      if ('h1ImageAlt' in expected) {
        const { h1ImageAlt } = expected;
        test(`heading 1 image alt is ${h1ImageAlt}`, async ({ page }) => {
          await expect(page.getByAltText(h1ImageAlt)).toBeVisible();
        });
      }
      if ('h2' in expected) {
        const { h2 } = expected;
        test(`heading 2 is ${h2}`, async ({ page }) => {
          await expect(
            page.getByRole('heading', { level: 2, name: h2 })
          ).toBeVisible();
        });
      }
    });
  });
});
