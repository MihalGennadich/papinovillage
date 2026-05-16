// @ts-check
const { test, expect } = require('@playwright/test');

// Multi-page static site. Each entry: path + expected canonical URL.
const PAGES = [
  { path: '', canonical: 'https://papinovillage.ru/' },
  { path: 'domiki/', canonical: 'https://papinovillage.ru/domiki/' },
  { path: 'banya-chan/', canonical: 'https://papinovillage.ru/banya-chan/' },
  { path: 'kak-dobratsya/', canonical: 'https://papinovillage.ru/kak-dobratsya/' },
  { path: 'otzyvy/', canonical: 'https://papinovillage.ru/otzyvy/' },
];

// Full breakpoint sweep on the home page (spec §6).
const WIDTHS = [320, 375, 390, 768, 1024, 1440];

function trackErrors(page) {
  /** @type {string[]} */
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  return errors;
}

async function commonChecks(page, expectedCanonical) {
  // Shared stylesheet actually resolved (relative path correctness).
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(245, 237, 224)');
  // Exactly one H1.
  await expect(page.locator('h1')).toHaveCount(1);
  // Canonical correct per page.
  await expect(page.locator('link[rel="canonical"]'))
    .toHaveAttribute('href', expectedCanonical);
  // Shared nav + JS-driven footer year present (proves site.js ran).
  await expect(page.locator('#nav')).toHaveCount(1);
  await expect(page.locator('#year')).not.toBeEmpty();
  // No horizontal overflow.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

for (const w of WIDTHS) {
  test(`home @ ${w}px`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('./');
    for (const id of ['hero', 'about', 'houses', 'services', 'faq', 'booking'])
      await expect(page.locator('#' + id)).toHaveCount(1);
    await expect(page.locator('#heroSub')).not.toBeEmpty();
    await commonChecks(page, 'https://papinovillage.ru/');
    const q = page.locator('.faq-q').first();
    await q.click();
    await expect(q).toHaveAttribute('aria-expanded', 'true');
    await page.screenshot({ path: `screenshots/${w}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

for (const pg of PAGES) {
  for (const w of [375, 1280]) {
    test(`page ${pg.path || 'home'} @ ${w}px`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto('./' + pg.path);
      await commonChecks(page, pg.canonical);
      expect(errors).toEqual([]);
    });
  }
}
