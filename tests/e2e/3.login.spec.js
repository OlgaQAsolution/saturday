import testData from '../../data/TestData.js';
import { test, expect } from '../../fixtures/fixtures.js';

test.describe('3.L Login: Verify Login functionality', () => {
    test('3.1. Login: Verify user can not login with invalid credentials @smoke', async ({ loginPage }) => {
        const { email, password } = testData.invalidUser;

        // Login with test credentials displayed on the website
        await loginPage.open();
        await loginPage.login(email, password, false);

        // Verify user is not logged in and error message is displayed
        await expect(loginPage.heading, 'Incorrect page heading on Login page').toBeVisible();
        await expect(loginPage.alert, `User loged in with valid ${email} and invalid ${password}`).toHaveText(
            "Bad credentials! Please try again! Make sure that you've registered.",
        );
    });

    test('3.2. Login: Verify that password fields mask input', async ({ loginPage }) => {
        await loginPage.open();

        const passwordType = await loginPage.password.getAttribute('type');
        expect(passwordType, 'Password field should mask input').toBe('password');
    });

    test('3.3. Login: @usability Verify placeholder text in login fields', async ({ loginPage }) => {
        await loginPage.open();
        await expect(loginPage.email, 'Incorrect placeholder text in email field').toHaveAttribute(
            'placeholder',
            'Enter email - insert admin@admin.com',
        );
        await expect(loginPage.password, 'Incorrect placeholder text in password field').toHaveAttribute(
            'placeholder',
            'Enter Password - insert admin123',
        );
    });
});
