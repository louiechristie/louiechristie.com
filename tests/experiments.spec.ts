import { test, expect, type Locator } from '@playwright/test';

type Navigation = {
	text: string;
	to: string;
	expected?: { h1: string } | { h1ImageAlt: string } | { h2: string };
};

const navigations: Navigation[] = [
	{
		text: 'Weather Winton',
		to: 'https://weather.louiechristie.com/',
		expected: {
			h1: 'Weather Winton',
		},
	},
	{
		text: 'Shorts (Memes)',
		to: '/memes/',
		expected: {
			h1: 'Shorts',
		},
	},

	{
		text: 'Quirky Travel Guide',
		to: 'https://comedy.louiechristie.com/travel/',
	},
	{
		text: 'Trivia Trundle',
		to: '/trivia-trundle/',
		expected: {
			h1: 'Trivia Trundle',
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
		text: 'Creative Tech Blog',
		to: '/blog/',
		expected: {
			h1: 'Blog',
		},
	},
	// Doesn't work because Dropbox changes the link.
	// {
	// 	text: 'Reckona',
	// 	to: 'https://www.dropbox.com/scl/fi/a4ondvpno7zoq63j9mlph/reckona-dont-forget-to-profit.mp4?rlkey=8zfuxij7rxi6e3gofok2rs6i8&st=ckbj81la&dl=0',
	// },
];

test.describe('experiments links', () => {
	test.beforeEach(async ({ page, baseURL }) => {
		await page.goto(
			baseURL + '/tech/experiments/' ||
				'https://www.louiechristie.com' + '/tech/experiments/'
		);
	});

	navigations.forEach((navigation) => {
		const { text, to, expected, faultyWordPressException } = navigation;

		test.describe(`${text} link`, async () => {
			let link: Locator;

			test.beforeEach(async ({ page, baseURL }) => {
				test.setTimeout(45000); // https://comedy.louiechristie.com/travel/
				link = await page.getByRole('link', { name: text });
				await link.click();
				await page.waitForURL(to);
			});

			test(`nav has link ${text}`, async ({ page }) => {
				expect(link).toBeVisible;
			});

			test(`url is ${to}`, async ({ page }) => {
				await expect(page).toHaveURL(to);
			});

			if (expected) {
				if ('h1' in expected) {
					const { h1 } = expected;
					test(`heading 1 is ${h1}`, async ({ page }) => {
						await expect(page.getByRole('heading', { level: 1 })).toContainText(
							h1
						);
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
			}
		});
	});
});
