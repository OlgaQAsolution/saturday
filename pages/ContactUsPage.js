import BasePage from './BasePage.js';

class ContactUsPage extends BasePage {
    constructor(page) {
        super(page);
    }
    /**
     * Open the Contact Us page by clicking the navigation link and wait for the heading to be visible
     */
    async open() {
        await this.header.contactNavLink.click();
        await this.heading.waitFor();
    }
    get heading() {
        return this.page.getByRole('heading', { name: 'Contact Us' });
    }

    get textarea() {
        return this.page.locator('p.text-center');
    }
}
export default ContactUsPage;
