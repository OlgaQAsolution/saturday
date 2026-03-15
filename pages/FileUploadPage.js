import BasePage from './BasePage.js';
import TestData from '../data/TestData.js';
import { expect, test } from 'fixtures/fixtures.js';
import { getFileName } from '../utils/helper.js';

class FileUploadPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async open() {
        await super.open(TestData.urls.fileUpload);
        await this.heading.waitFor();
    }

    /**
     * Upload a file
     * @param {string} filePath - Path to the file to upload
     * @returns {Promise<void>}
     */
    async uploadFile(filePath) {
        if (!filePath) {
            throw new Error('File path is undefined');
        }
        await this.uploadButton.waitFor();
        await this.uploadButton.setInputFiles(filePath);

        const fileName = getFileName(filePath);

        await expect(this.uploadButton).toHaveValue(new RegExp(`${fileName}$`));
        await this.submitButton.scrollIntoViewIfNeeded();

        // Bug on Mobile browers would need to be reported: submit button shifted too far to the right
        if (test.info().project.name.includes('Mobile') || test.info().project.name.includes('Tablet')) {
            await this.uploadButton.evaluate((el) => {
                el.style.display = 'none';
            });
        }

        await this.submitButton.click();
        await this.successMessage.waitFor();
    }

    get uploadButton() {
        return this.page.locator('#file_upload');
    }

    get submitButton() {
        return this.page.locator('[type="submit"]');
    }

    get successMessage() {
        return this.page.locator('#file_upload_response');
    }

    get heading() {
        return this.page.locator('h2');
    }

    get content() {
        return this.page.locator('#content');
    }
}

export default FileUploadPage;
