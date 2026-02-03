import { test, expect, type Locator } from '@playwright/test';

type Navigation = {
	text: string;
	to: string;
	expected: { h1: string } | { h1ImageAlt: string } | { h2: string };
	faultyWordPressException?: boolean;
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
		text: 'Memes',
		to: '/memes/',
		expected: {
			h1: 'Shorts',
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
	{
		text: 'Reckona',
		to: 'https://www.reckona.co.uk/',
		expected: {
			h2: 'The Recruitment Calculator',
		},
		faultyWordPressException: true,
	},
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
					if (faultyWordPressException) {
						await expect(
							page.getByRole('heading', { level: 2, name: h2 })
						).toHaveCount(1);
					} else {
						await expect(
							page.getByRole('heading', { level: 2, name: h2 })
						).toBeVisible();
					}
				});
			}
		});
	});
});
