// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Self-contained config: Playwright starts a local static server for the
 * site itself, runs the responsive suite, then tears the server down.
 * Override the target with BASE_URL to test the live deployed site.
 */
// Always end with a slash so relative navigation keeps any base path
// (GitHub Pages serves project sites under /<repo>/).
const baseURL = (process.env.BASE_URL || 'http://127.0.0.1:8080').replace(/\/?$/, '/');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [['list']],
  use: { baseURL },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'python -m http.server 8080 --bind 127.0.0.1',
        url: 'http://127.0.0.1:8080',
        reuseExistingServer: true,
        timeout: 30000,
      },
});
