import { test as setup } from '../fixtures/fixtures.js';
import testData from '../data/TestData.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const authStorageStatePath = path.join(__dirname, '../.auth/auth.json');

setup.describe('User authentication', () => {
    setup('save authenticated storage state', async ({ loginPage }) => {
        const { email, password } = testData.validUser;

        await loginPage.open();
        await loginPage.login(email, password);

        // Save storage state
        await loginPage.page.context().storageState({
            path: authStorageStatePath,
        });
    });
});
