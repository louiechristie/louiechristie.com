import { test, expect } from '@playwright/test';

test('shows the Santa surfing image during Christmas season', async ({
	page,
	baseURL,
}) => {
	await page.clock.install({
		time: new Date('2026-11-21T12:00:00Z'),
	});
	await page.goto(baseURL || 'https://www.louiechristie.com');

	const surfImage = page.locator('#surf-image');

	await expect(page.locator('#adventure-link').locator('> *')).toHaveCount(1);
	await expect(surfImage).toHaveAttribute(
		'src',
		'/images/louie_christie_surfing_as_father_christmas.JPG'
	);
	await expect(surfImage).toHaveAttribute(
		'alt',
		'Louie Christie dressed as Father Christmas in a Santa suit surfing'
	);
	await expect(page.locator('#surf-caption')).toHaveText(
		'Surfing, Christmas Day 2020 @ Bondi Beach'
	);
});
