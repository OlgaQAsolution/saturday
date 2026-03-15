import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import HomePage from '../pages/HomePage.js';
import ShippingPage from '../pages/ShippingPage.js';
import FileUploadPage from '../pages/FileUploadPage.js';
import ContactUsPage from '../pages/ContactUsPage.js';

const pageClasses = {
    homePage: HomePage,
    loginPage: LoginPage,
    shippingPage: ShippingPage,
    fileUploadPage: FileUploadPage,
    contactUsPage: ContactUsPage,
};

const fixtures = {};

for (const [fixture_name, PageClass] of Object.entries(pageClasses)) {
    fixtures[fixture_name] = async ({ page }, use) => {
        await use(new PageClass(page));
    };
}

/** @type {import('@playwright/test').TestType<CustomFixtures, {}>} */
const test = base.extend(
    /** @type {import('@playwright/test').Fixtures<CustomFixtures, {}>} */
    fixtures,
);

export { test, expect };
