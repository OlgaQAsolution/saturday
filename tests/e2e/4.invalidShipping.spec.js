import testData from '../../data/TestData.js';
import { test, expect } from '../../fixtures/fixtures.js';

test.describe('4. Verify User cannot submit order with invalid or empty shipping address', () => {
    test('4.1. Verify validation errors appear when user tries to submit order with invalid shipping address', async ({
        loginPage,
        homePage,
        shippingPage,
    }) => {
        const { email, password } = testData.validUser;
        const itemToAdd = testData.items[0];

        await loginPage.open();
        await loginPage.login(email, password);
        await homePage.addItemsToCart([itemToAdd.name]);

        // Try to Submit the order
        await homePage.clickCheckout();

        const sets = [
            {
                missingField: await shippingPage.phoneNumber,
                invalidAddress: testData.validAddress[0],
            },
            {
                missingField: await shippingPage.street,
                invalidAddress: testData.validAddress[1],
            },
            {
                missingField: await shippingPage.city,
                invalidAddress: testData.validAddress[2],
            },
            {
                missingField: await shippingPage.country,
                invalidAddress: testData.validAddress[3],
            },
        ];

        for (const [index, set] of sets.entries()) {
            // Clear the form before filling in the next set of invalid data
            await shippingPage.clearForm();
            await shippingPage.fillShippingDetails(set.invalidAddress);

            // Verify the error message is displayed
            const errorMessage = await set.missingField.evaluate((el) => el.validationMessage);
            if (index === 3) {
                await expect(errorMessage).toBe('');

                // Verify country field is highlighted
                await expect(set.missingField, 'Country field is not highlighted').toHaveCSS('color', 'rgb(255, 0, 0)');
            } else {
                if (test.info().project.name.includes('WebKit')) {
                    await expect(errorMessage, 'Incorrect error message for WebKit').toBe('Fill out this field');
                } else {
                    await expect(errorMessage, 'Incorrect error message on Shipping page').toBe(
                        'Please fill out this field.',
                    );
                }
            }
        }
    });
});
