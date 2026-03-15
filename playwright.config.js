// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config.js';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    snapshotDir: './screenshots',
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { outputFolder: 'playwright-report' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['list'],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,
        /* Collect trace on failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        /* Take a screenshot on failure */
        screenshot: 'only-on-failure',
        /* Record a video on failure */
        video: {
            mode: 'retain-on-failure',
            size: process.env.CI ? { width: 800, height: 600 } : { width: 1440, height: 900 },
        },
        viewport: { width: 1280, height: 720 },
    },

    /* Configure projects for major browsers */
    projects: [
        /* Running auth setup once before the test projects would be useful if the site used localStorage or sessionStorage. Here is for demonstration purposes. */
        {
            name: 'potential setup',
            testMatch: '**/auth.setup.js',
        },
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] },
        //     grepInvert: /@screenshot/,
        // },
        // {
        //     name: 'WebKit',
        //     use: { ...devices['Desktop Safari'] },
        //     grepInvert: /@screenshot/,
        // },
    ],
});
