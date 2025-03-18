import { test, expect } from '@playwright/test';
import { urls } from './musicnatters.spec';

type Navigation =
  | {
      text: string;
      to: string;
      expected: { h1: string } | { h1ImageAlt: string } | { h2: string };
    }
  | {
      text: string;
      to: string[];
    };

const navigations: Navigation[] = [
  {
    text: 'home',
    to: '/',
    expected: {
      h1: 'Louie Christie',
    },
  },
  {
    text: 'adventure',
    to: '/adventure/',
    expected: {
      h1ImageAlt: 'Adventure',
    },
  },
  {
    text: 'blog',
    to: '/blog/',
    expected: {
      h1: 'Blog',
    },
  },
  {
    text: 'experiments',
    to: '/#experiments',
    expected: {
      h2: 'Experiments',
    },
  },
  {
    text: 'talks',
    to: '/#tech-talks',
    expected: {
      h2: 'Tech Event Host',
    },
  },
  {
    text: 'tutorials',
    to: '/intro-to-web-dev-course/',
    expected: {
      h1: 'Introduction to Web Development Course',
    },
  },
  {
    text: 'memes',
    to: '/memes/',
    expected: {
      h1: 'Memes',
    },
  },
  {
    text: 'podcasts',
    to: urls,
  },
  {
    text: 'profiles',
    to: '/#profiles',
    expected: {
      h2: 'Profiles',
    },
  },
  {
    text: 'about',
    to: '/#about',
    expected: {
      h2: 'About Me',
    },
  },
  {
    text: 'contact',
    to: '/#contact',
    expected: {
      h2: 'Contact',
    },
  },
];

const isProduction = process.env.ELEVENTY_RUN_MODE === 'build';

if (isProduction) {
  test.describe('nav external redirects', () => {
    test.describe('comedy link redirects to https://undergroundcomedian.wordpress.com/', () => {
      test('should redirect on desktop', async ({ page, baseURL }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto(baseURL || 'https://www.louiechristie.com');

        const comedyLink = page.getByText('comedy', { exact: true });

        // Click the comedy link by its text
        await expect(comedyLink).toBeVisible();

        await comedyLink.click();

        await page.waitForURL('https://undergroundcomedian.wordpress.com/');

        // Check the h1 heading
        await expect(
          page.getByRole('heading', { level: 1, name: 'Underground Comedian' })
        ).toBeVisible();
      });

      test('should redirect on mobile', async ({ page, baseURL }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE dimensions

        await page.goto(baseURL || 'https://www.louiechristie.com/');

        const toggler = page.getByLabel('Toggle navigation');

        // Ensure the button is visible
        await expect(toggler).toBeVisible();

        // Click the navbar toggler
        await toggler.click();

        const comedyLink = page.getByText('comedy', { exact: true });

        // Click the comedy link by its text
        await expect(comedyLink).toBeVisible();

        await comedyLink.click();

        await page.waitForURL('https://undergroundcomedian.wordpress.com/');

        // Check the h1 heading
        await expect(
          page.getByRole('heading', { level: 1, name: 'Underground Comedian' })
        ).toBeVisible();
      });
    });
  });
}

test.describe('nav links', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseURL || 'https://www.louiechristie.com');
  });

  navigations.forEach((navigation) => {
    const { text, to } = navigation;
    test.describe(`${text} link`, () => {
      if ('expected' in navigation && typeof to === 'string') {
        const { expected } = navigation;

        test(`url is ${to}`, async ({ page }) => {
          const navigation = await page.getByRole('navigation');
          await navigation.getByRole('link', { name: text }).click();
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
      } else {
        test(`url to be one of valid`, async ({ page }) => {
          const link = page.getByText(text, { exact: true });
          await link.click();
          expect(to).toContain(page.url());
        });
      }
    });
  });
});
