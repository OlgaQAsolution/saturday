import BasePage from './BasePage.js';
import ShippingPage from './ShippingPage.js';

class HomePage extends BasePage {
    shippingPage = new ShippingPage(this.page);

    constructor(page) {
        super(page);
    }
    /**
     * Get the header of a shop item by its index
     * @param {number} nth - Index of the item (default: 0)
     * @returns {Promise<import('playwright').Locator>} Locator for the item header
     */
    async getItemHeader(nth = 0) {
        return this.page.locator('.shop-item-title').nth(nth);
    }

    /**
     * Get the price of a shop item by its index
     * @param {number} nth - Index of the item (default: 0)
     * @returns {Promise<import('playwright').Locator>} Locator for the item price
     */
    async getItemPrice(nth = 0) {
        return this.page.locator('.shop-item-price').nth(nth);
    }

    /**
     * Get the picture of a shop item by its index
     * @param {number} nth - Index of the item (default: 0)
     * @returns {Promise<import('playwright').Locator>} Locator for the item picture
     */
    async getItemPicture(nth = 0) {
        return this.page.locator('.shop-item-image').nth(nth);
    }

    /**
     * Get the "Add to Cart" button of a shop item by its index
     * @param {number} nth - Index of the item (default: 0)
     * @returns {Promise<import('playwright').Locator>} Locator for the "Add to Cart" button
     */
    async getItemAddToCartButton(nth = 0) {
        return this.page.locator('.shop-item button', { hasText: 'ADD TO CART' }).nth(nth);
    }

    /**
     * Get item Locator by name
     * @param {string} itemName - Name of the item
     * @returns {Promise<import('playwright').Locator>} Locator for the item
     */
    async getItemByName(itemName) {
        return await this.page.locator(`.shop-item:has-text("${itemName}")`);
    }

    /**
     * Add items to the cart
     * @param {string[]} items - Array of item names to add to the cart
     * @returns {Promise<void>}
     */
    async addItemsToCart(items) {
        for (const item of items) {
            await (await this.getItemByName(item)).getByRole('button', { name: 'ADD TO CART' }).click();
        }
    }
    /**
     * Click checkout button and navigate to shipping page
     * @returns {Promise<void>}
     */
    async clickCheckout() {
        await this.checkoutButton.click();
        await this.shippingPage.heading.waitFor();
    }

    get heading() {
        return this.page.getByRole('heading', { name: 'SHOPPING CART' });
    }

    get priceColumnSelector() {
        return '.cart-price';
    }

    get quantityColumnSelector() {
        return '.cart-quantity input';
    }

    get removeButtonSelector() {
        return '.cart-quantity button';
    }

    get checkoutButton() {
        return this.page.getByText('PROCEED TO CHECKOUT');
    }

    get shoppingCartRow() {
        return this.page.locator('.cart-row');
    }

    get cartTotal() {
        return this.page.locator('.cart-total');
    }

    get item() {
        return this.page.locator('.shop-item');
    }
}

export default HomePage;
