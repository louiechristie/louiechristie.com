import { test, expect } from "@playwright/test";

const redirects = [
  {
    from: "https://www.louiechristie.com/comedy/",
    to: "https://undergroundcomedian.wordpress.com/",
    h1: "Underground Comedian",
  },
  {
    from: "https://www.louiechristie.com/comedy/improv/",
    to: "https://undergroundcomedian.wordpress.com/improv/",
    h1: "Improv",
  },
  {
    from: "https://blog.louiechristie.com/",
    to: "https://www.louiechristie.com/blog/",
    h1: "Louie Learns Blog",
  },
  {
    from: "https://blog.louiechristie.com/2021/02/19/you-computer-geeks-are-all-the-same/",
    to: "https://www.louiechristie.com/blog/2021/02/19/you-computer-geeks-are-all-the-same/",
    h1: "Louie Learns Blog",
    h2: "You Computer Geeks Are All The Same",
  },
  {
    from: "https://raspberrypi.louiechristie.com/",
    to: "https://www.louiechristie.com/blog/2014/03/09/computers-for-good/",
    h1: "Louie Learns Blog",
    h2: "Computers For Good",
  },
];

const removeTrailingSlash = (string: string) => {
  // remove single or consecutive trailing slashes:
  return string.replace(/\/+$/g, "");
};

const removeWww = (string) => {
  return string.replace("://www.", "://");
};

const removeSecure = (string) => {
  return string.replace("https", "http");
};

redirects.forEach((redirect) => {
  const { from, to, title, h1, h2 } = redirect;

  [
    // https
    { testName: "original url", from },
    { testName: "no slash", from: removeTrailingSlash(from) },
    { testName: "no www", from: removeWww(from) },
    {
      testName: "no trailing slash, no www",
      from: removeTrailingSlash(removeWww(from)),
    },

    // http
    { testName: "no https", from: removeSecure(from) },
    {
      testName: "no https, no slash",
      from: removeSecure(removeTrailingSlash(from)),
    },
    { testName: "no https, no www", from: removeSecure(removeWww(from)) },
    {
      testName: "no https, no trailing slash, no www",
      from: removeSecure(removeTrailingSlash(removeWww(from))),
    },
  ].forEach(({ testName, from }) => {
    const testGroup = `test ${testName} from ${from} to ${to}`;

    test.describe(testGroup, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(from);
      });

      expect(!!(title || h1 || h2)).toBe(true);

      if (title) {
        test(`title`, async ({ page }) => {
          await expect(page).toHaveTitle(title);
        });
      }
      if (h1) {
        test(`heading 1`, async ({ page }) => {
          await expect(
            page.getByRole("heading", { level: 1, name: h1 })
          ).toBeVisible();
        });
      }
      if (h2) {
        test(`heading 2`, async ({ page }) => {
          await expect(
            page.getByRole("heading", { level: 1, name: h2 }) // @TODO fix this
          ).toBeVisible();
        });
      }
      test(`url`, async ({ page }) => {
        await expect(page).toHaveURL(to);
      });
    });
  });
});

// @TODO Replace nav with something more accessible like bootstrap nav and then fix this test.
// test.describe('navigation comedy link', () => {
//   test('should redirect to Underground Comedian website', async ({ page }) => {
//     await page.goto('https://www.louiechristie.com');    

//     await page.getByLabel('menu').check()    

//     // Click the comedy link by its text
//     await page.getByText('comedy', { exact: true }).click()
//     await page.waitForURL('https://undergroundcomedian.wordpress.com/')
    
//     // Check the h1 heading
//     await expect(
//       page.getByRole('heading', { level: 1, name: 'Underground Comedian' })
//     ).toBeVisible();
//   });
// });
