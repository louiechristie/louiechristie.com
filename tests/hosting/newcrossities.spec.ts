import { test, expect } from '@playwright/test';

const homepageAddresses = [
	// https
	'https://www.newcrossities.com/',
	'https://www.newcrossities.com',

	'https://newcrossities.com/',
	'https://newcrossities.com',

	// http

	'http://www.newcrossities.com/',
	'http://www.newcrossities.com',

	'http://newcrossities.com/',
	'http://newcrossities.com',
];

const title =
	'Quirky Travel Guide to South London - Newcrossities - new Curiosities';
const heading = 'Quirky Travel Guide';
const url = 'https://comedy.louiechristie.com/travel/';

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
