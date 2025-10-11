import { test, expect, type Locator } from '@playwright/test';

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
    text: 'tech',
    to: '/tech/',
    expected: {
      h1: 'Tech',
    },
  },
  {
    text: 'adventure',
    to: '/adventure/',
    expected: {
      h1: 'Adventure',
    },
  },
  {
    text: 'about',
    to: '/about/',
    expected: {
      h1: 'About Me',
    },
  },
  {
    text: 'contact',
    to: '/contact/',
    expected: {
      h1: 'Contact',
    },
  },
];

const isProduction = !!process.env.CI;

if (isProduction) {
  test.describe('nav external redirects', () => {
    test('comedy link redirects to https://comedy.louiechristie.com/', async ({
      page,
      baseURL,
    }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      await page.goto(
        baseURL + 'tech' || 'https://www.louiechristie.com' + 'tech'
      );

      const comedyLink = page.getByText('comedy', { exact: true });

      // Click the comedy link by its text
      await expect(comedyLink).toBeVisible();

      await comedyLink.click();

      await page.waitForURL('https://comedy.louiechristie.com/');

      // Check the title because no h1 in current Ghost template
      await expect(page).toHaveTitle('Louie Christie, Alternative Comedian');
    });
  });
}

test.describe('nav links', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(
      baseURL + '/tech/' || 'https://www.louiechristie.com' + '/tech/'
    );
  });

  navigations.forEach((navigation) => {
    const { text, to } = navigation;
    test.describe(`${text} link`, () => {
      let link: Locator;

      test.beforeEach(async ({ page }) => {
        link = await page
          .getByRole('navigation')
          .getByRole('link', { name: text, exact: true });

        await link.click();
      });

      if ('expected' in navigation && typeof to === 'string') {
        const { expected } = navigation;

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
