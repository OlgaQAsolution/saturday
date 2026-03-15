import TestData from '../data/TestData.js';
import BasePage from './BasePage.js';
import HomePage from './HomePage.js';

class LoginPage extends BasePage {
    homePage = new HomePage(this.page);
    constructor(page) {
        super(page);
    }

    /**
     * Open the login page and wait for the heading to be visible
     */
    async open() {
        await super.open(TestData.urls.login);
        await this.heading.waitFor();
    }

    /**
     * Login with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {boolean} success - Whether to wait for successful login (default: true)
     * @returns {Promise<void>}
     */
    async login(email, password, success = true) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.submitButton.click();

        if (success) {
            await this.homePage.heading.waitFor();
        }
    }

    get email() {
        return this.page.getByLabel('Email');
    }

    get password() {
        return this.page.getByLabel('Password');
    }

    get submitButton() {
        return this.page.locator('#submitLoginBtn');
    }

    get heading() {
        return this.page.locator('h2:has-text("Login - Shop")');
    }

    get credentialInstructions() {
        return this.page.locator('#emailHelp');
    }

    get alert() {
        return this.page.locator('[role="alert"]');
    }
}

export default LoginPage;
