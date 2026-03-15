/**
 * TestType is needed to properly type the test object with CustomFixtures - provides IDE autocomplete
 * and type-safety for fixture injection into test functions
*/ 
import type { TestType } from '@playwright/test';

// expect is exported here so tests can import it directly from fixtures.js
import { expect } from '@playwright/test';

import type LoginPage from '../pages/LoginPage.js';
import type HomePage from '../pages/HomePage.js';
import type ShippingPage from '../pages/ShippingPage.js';
import type FileUploadPage from '../pages/FileUploadPage.js';
import type ContactUsPage from '../pages/ContactUsPage.js';

/**
 * CustomFixtures defines all available fixtures and their types
 * This allows tests to inject and access page objects with full type safety
 */
type CustomFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  shippingPage: ShippingPage;
  fileUploadPage: FileUploadPage;
  contactUsPage: ContactUsPage;
};

// Export typed test function - enables test code to use fixture injection with autocomplete
export const test: TestType<CustomFixtures, {}>;

// Export expect for test assertions - using same typed instance as test
export { expect };
