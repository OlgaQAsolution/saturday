import BasePage from './BasePage.js';

class ShippingPage extends BasePage {
    constructor(page) {
        super(page);
    }

    /**
     * Fill in shipping details
     * @param {Object} options - Shipping details
     * @param {string} options.phone - Phone number
     * @param {string} options.street - Street address
     * @param {string} options.city - City
     * @param {string} options.country - Country
     * @param {boolean} options.submit - Whether to submit the order after filling details
     * */
    async fillShippingDetails(options = {}) {
        const { phone, street, city, country, submit = true } = options;

        if (phone) await this.phoneNumber.fill(phone);
        if (street) await this.street.fill(street);
        if (city) await this.city.fill(city);
        if (country) {
            await this.country.click();
            await this.country.selectOption({
                value: country,
            });
        }
        if (submit) await this.clickSubmit();
    }
    /**
     * Clear the shipping form fields
     */
    async clearForm() {
        await this.phoneNumber.clear();
        await this.street.clear();
        await this.city.clear();
        await this.country.click();
        await this.country.selectOption({ value: 'Select a country...' });
    }

    /**
     * Submit the order and wait for confirmation message
     * @returns {Promise<void>}
     */
    async clickSubmit() {
        await this.submitButton.click();
        await this.message.waitFor();
    }

    get heading() {
        return this.page.getByRole('heading', { name: 'SHIPPING DETAILS' });
    }

    get phoneNumber() {
        return this.page.locator('[placeholder="Enter phone number"]');
    }

    get street() {
        return this.page.locator('[placeholder="5876 Little Streets"]');
    }

    get city() {
        return this.page.locator('[placeholder="London"]');
    }

    get country() {
        return this.page.locator('#countries_dropdown_menu');
    }

    get submitButton() {
        return this.page.getByRole('button', { name: 'Submit Order' });
    }

    get message() {
        return this.page.locator('#message');
    }
}

export default ShippingPage;
