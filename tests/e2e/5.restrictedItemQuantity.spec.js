import testData from '../../data/TestData.js';
import { test, expect } from '../../fixtures/fixtures.js';

test.only('5.1. Shopping Cart: Verify User can not add more than 1 item of the same type', async ({
    loginPage,
    homePage,
}) => {
    const { email, password } = testData.validUser;
    const itemToAdd = testData.items[4];

    // Login with test credentials displayed on the website
    await loginPage.open();
    await loginPage.login(email, password);

    // Add item to the cart
    await homePage.addItemsToCart([itemToAdd.name]);

    // Try to add the same item again
    await homePage.addItemsToCart([itemToAdd.name]);

    // Verify alert message is displayed
    homePage.page.on('dialog', (dialog) => {
        expect(dialog.message()).toBe('This item is already added to the cart');
        dialog.accept();
    });
});
