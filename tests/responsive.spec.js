// @ts-check
const { test, expect } = require('@playwright/test');

// Breakpoints mandated by the spec (§6).
const WIDTHS = [320, 375, 390, 768, 1024, 1440];

for (const w of WIDTHS) {
  test(`layout @ ${w}px`, async ({ page }) => {
    /** @type {string[]} */
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('/');

    // All key sections present.
    for (const id of ['hero', 'about', 'houses', 'services', 'amenities',
      'location', 'reviews', 'faq', 'booking', 'contacts']) {
      await expect(page.locator('#' + id)).toHaveCount(1);
    }

    // Seasonal subtitle filled by JS (not empty).
    await expect(page.locator('#heroSub')).not.toBeEmpty();

    // No horizontal overflow (mobile-first requirement).
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);

    // FAQ accordion opens on click.
    const firstQ = page.locator('.faq-q').first();
    await firstQ.click();
    await expect(firstQ).toHaveAttribute('aria-expanded', 'true');

    await page.screenshot({ path: `screenshots/${w}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}
