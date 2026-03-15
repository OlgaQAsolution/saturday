import Header from '../components/Header.js';

class BasePage {
    /**
     * Constructor for BasePage
     * @param {import('@playwright/test').Page} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
    }

    /**
     * Navigate to a URL
     * @param {string} url - URL to navigate to
     * @returns {Promise<void>}
     */
    async open(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }

    /**
     * Get a specific cell value from a row based on column selector
     * @param {string} knownCellValue - A value to identify the row
     * @param {import('@playwright/test').Locator} row - Row element
     * @param {string} columnSelector - CSS selector for the column
     * @returns {Promise<import('@playwright/test').Locator>} Cell element
     */
    async getCellValue(knownCellValue, columnSelector) {
        return await this.page.locator(`.cart-row:has-text("${knownCellValue}") ${columnSelector}`);
    }
    /**
     * Wait for any ongoing animations or color changes to complete
     */
    async waitForAnimation() {
        await this.page.waitForTimeout(500);
    }
}

export default BasePage;
