import testData from '../../data/TestData.js';
import { getFileName } from '../../utils/helper.js';
import { test, expect } from '../../fixtures/fixtures.js';

test.describe('2. Verify Upload File functionality', () => {
    test('2.1. Verify user can upload a valid file', async ({ fileUploadPage }) => {
        await fileUploadPage.open();
        await expect(fileUploadPage.heading, 'Incorrect page heading on Upload File page').toHaveText(
            'File Upload Example',
        );

        await fileUploadPage.uploadFile(testData.filePath);
        const fileName = getFileName(testData.filePath);
        await expect(fileUploadPage.successMessage, 'Incorrect success message on Upload File page').toHaveText(
            `You have successfully uploaded "${fileName}"`,
        );
    });

    test('2.2. @screenshot Verify Upload File page', async ({ fileUploadPage }) => {
        await fileUploadPage.open();
        await fileUploadPage.content.screenshot();
        await expect(fileUploadPage.content, 'Incorrect Upload File page screenshot').toHaveScreenshot();
    });
});
