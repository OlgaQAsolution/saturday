import testData from '../../data/TestData.js';
import { test, expect } from '../../fixtures/fixtures.js';
import { getTotalPrice } from '../../utils/helper.js';

test.describe('1. Verify User can submit order with valid credentials', () => {
    test('1.1. Verify user can add an item to the cart and submit order @smoke', async ({
        loginPage,
        homePage,
        shippingPage,
    }) => {
        const { email, password } = testData.validUser;
        const itemToAdd = testData.items[0];

        // Login with test credentials displayed on the website
        await loginPage.open();
        await loginPage.login(email, password);

        // Add item to the cart
        await homePage.addItemsToCart([itemToAdd.name]);
        const foundPrice = await homePage.getCellValue(itemToAdd.name, homePage.priceColumnSelector);
        const foundQuantity = await homePage.getCellValue(itemToAdd.name, homePage.quantityColumnSelector);
        const removeButton = await homePage.getCellValue(itemToAdd.name, homePage.removeButtonSelector);

        await expect(removeButton, 'Incorrect remove button text').toHaveText('REMOVE');
        await expect(foundQuantity, 'Incorrect quantity value').toHaveValue(itemToAdd.quantity);
        await expect(foundPrice, 'Incorrect price value').toHaveText(itemToAdd.price);
        await expect(homePage.cartTotal, 'Incorrect cart total').toHaveText(`Total ${itemToAdd.price}`);

        // Submit the order
        await homePage.clickCheckout();

        // Fill in all shipping details
        await shippingPage.fillShippingDetails(testData.validAddress);

        // Verify the confirmation message with the total price and shipping address
        const expectedMessage = `Congrats! Your order of  ${itemToAdd.price} has been registered and will be shipped to ${testData.validAddress.street}, ${testData.validAddress.city} - ${testData.validAddress.country}.`;
        await expect(shippingPage.message, 'Incorrect confirmation message').toHaveText(expectedMessage);

        // Logout and verify user is redirected to login page
        await shippingPage.header.logout();
        await expect(loginPage.heading, 'Login page heading not visible after logout').toBeVisible();
    });

    test('1.2. Verify User can add multiple items and modify the Shopping Cart', async ({ loginPage, homePage }) => {
        const { email, password } = testData.validUser;

        await loginPage.open(testData.urls.login);

        // Verify instructions are displayed: 'Please use credentials Email: admin@admin.com Password: admin123'
        await expect(loginPage.credentialInstructions, 'Incorrect credential instructions').toHaveText(
            'Please use credentials Email: admin@admin.com Password: admin123',
        );

        await loginPage.login(email, password);

        // Verify header shows Home, Contact, and Log Out options
        await expect(homePage.header.homeNavLink, 'Header Home element not visible on Home page.').toBeVisible();
        await expect(homePage.header.contactNavLink, 'Header Contact element not visible on Home page.').toBeVisible();
        await expect(homePage.header.logOutNavLink, 'Header Log Out element not visible on Home page.').toBeVisible();

        // Verify shopping cart is empty
        await expect(homePage.shoppingCartRow, 'Shopping cart is not empty').toHaveCount(1);

        // Verify shopping cart heading: ITEM PRICE QUANTITY and Total $0 are visible
        await expect(homePage.shoppingCartRow, 'Incorrect shopping cart heading').toHaveText('ITEM\nPRICE\nQUANTITY');
        await expect(homePage.cartTotal, 'Incorrect cart total').toHaveText('Total $0');

        // Verify all displayed products
        const displayed_items = await homePage.item.all();

        const displayed_items_text = [];
        for (let i = 0; i < displayed_items.length; i++) {
            const itemHeader = await homePage.getItemHeader(i);
            const itemPrice = await homePage.getItemPrice(i);
            const itemPicture = await homePage.getItemPicture(i);

            // Verify product name, price and image
            await expect(itemHeader, 'Incorrect item header').toHaveText(testData.items[i].name);
            await expect(itemPrice, 'Incorrect item price').toHaveText(testData.items[i].price);
            await expect(itemPicture, 'Incorrect item picture').toHaveAttribute('src', testData.items[i].picture);
            const addToCartButton = await homePage.getItemAddToCartButton(i);

            // Verify 'ADD TO CART' button changes color on hover, and does not have box-shadow
            await homePage.waitForAnimation();
            const colorBeforeHover = await getButtonColor(addToCartButton);
            await addToCartButton.scrollIntoViewIfNeeded();
            await addToCartButton.hover();
            await homePage.waitForAnimation();
            const colorAfterHover = await getButtonColor(addToCartButton);
            await expect(colorBeforeHover).not.toBe(colorAfterHover);
            await expect(addToCartButton).toHaveCSS('box-shadow', 'none');

            displayed_items_text.push({
                header: await itemHeader.textContent(),
                price: await itemPrice.textContent(),
                pictureSrc: await itemPicture.getAttribute('src'),
            });

            // Add each product to the cart
            await addToCartButton.click();
        }

        // Verify every cell value for the added items
        testData.items.forEach(async (item) => {
            const foundPrice = await homePage.getCellValue(item.name, homePage.priceColumnSelector);
            const foundQuantity = await homePage.getCellValue(item.name, homePage.quantityColumnSelector);
            const removeButton = await homePage.getCellValue(item.name, homePage.removeButtonSelector);

            await expect(removeButton, `Incorrect remove button text for item: ${item.name}`).toHaveText('REMOVE');
            await expect(foundQuantity, `Incorrect quantity for item: ${item.name}`).toHaveValue(item.quantity);
            await expect(foundPrice, `Incorrect price for item: ${item.name}`).toHaveText(item.price);
        });

        // Sum all the prices of the added items
        const totalPrice = getTotalPrice(testData.items);

        await expect(homePage.cartTotal, 'Incorrect cart total').toHaveText(`Total $${totalPrice}`);
        await expect(homePage.shoppingCartRow, 'Incorrect number of shopping cart rows').toHaveCount(
            testData.items.length + 1,
        );

        // User remove one item from the cart
        const itemToRemove = testData.items[0].name;
        const removeButton = await homePage.getCellValue(itemToRemove, homePage.removeButtonSelector);
        await removeButton.click();

        // Verify the item is removed from the cart and total price is updated
        await expect(homePage.shoppingCartRow, 'Incorrect number of shopping cart rows after removal').toHaveCount(
            testData.items.length,
        );
        const updatedTotalPrice = getTotalPrice(testData.items.slice(1));
        await expect(homePage.cartTotal, 'Incorrect cart total after removal').toHaveText(
            `Total $${updatedTotalPrice}`,
        );
    });
});
async function getButtonColor(button) {
    /* eslint-disable-next-line no-undef */
    return button.evaluate((el) => getComputedStyle(el).backgroundColor);
}
