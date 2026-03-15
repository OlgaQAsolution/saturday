class Header {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    get logoutButton() {
        return this.page.locator('#logout');
    }

    get homeNavLink() {
        return this.page.getByRole('link', { name: 'Home' });
    }

    get contactNavLink() {
        return this.page.getByRole('link', { name: 'Contact' });
    }

    get logOutNavLink() {
        return this.page.getByRole('link', { name: 'Log Out' });
    }

    get closeButton() {
        return this.page.locator('#sidebarCollapse');
    }

    async logout() {
        await this.logoutButton.click();
        await this.page.waitForLoadState();
    }
}

export default Header;
