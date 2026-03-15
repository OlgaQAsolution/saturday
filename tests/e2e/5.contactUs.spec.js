import { test, expect } from '../../fixtures/fixtures.js';

test('5.1. Contact Us: Verify User can open Contact page from Login page', async ({ loginPage, contactUsPage }) => {
    await loginPage.open();

    // Verify header shows Home, Contact options
    [loginPage.header.homeNavLink, loginPage.header.contactNavLink].forEach(async (navLink) => {
        await expect(navLink, `Expected ${await navLink.textContent()} to be visible on Login page.`).toBeVisible();
    });
    await expect(loginPage.header.closeButton, 'Close button is not visible on Login page').toBeVisible();

    // Verify that Log Out option is not visible on Login page
    await expect(
        loginPage.header.logOutNavLink,
        'Log Out option should not be visible on Login page',
    ).not.toBeVisible();

    // Click on Contact link and verify Contact page is opened
    await contactUsPage.open();
    await expect(contactUsPage.heading, 'Incorrect page heading on Contact page').toHaveText('Contact us');
    await expect(contactUsPage.textarea, 'Incorrect text in Contact page textarea').toHaveText(`
            Do you have any questions / feedback / improvement ideas? Please do
            not hesitate to contact me HERE. I will reply to you within a
            matter of hours. `);
});
