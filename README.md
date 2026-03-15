# E2E Tests — QA Practice Ecommerce

End-to-end tests for the [QA Practice](https://qa-practice.netlify.app/auth_ecommerce) web app, covering the full user journey from login to order submission.

## What Is Tested

| # | Suite | Tests |
|---|-------|-------|
| 1 | **Happy Flow** | Add item to cart and submit order · Add multiple items and modify cart |
| 2 | **File Upload** | Upload a valid file · Visual snapshot of the upload page |
| 3 | **Login** | Invalid credentials rejection · Password field masking · Placeholder text |
| 4 | **Invalid Shipping Address** | Validation errors on invalid / empty shipping address |
| 5 | **Contact Us** | Contact page accessible from the login page |

## Prerequisites

- **Node.js** = v22.17.1

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | All tests (headless) |
| `npm run test:e2e` | E2E suite only |
| `npm run test:smoke` | Smoke tests (`@smoke` tag) |
| `npm run test:headed` | All tests with browser visible |
| `npm run test:ui` | Interactive Playwright UI mode |

## Framework

- **Playwright** `^1.58.2`
- **ESLint + Prettier** — linting and formatting enforced via Husky pre-commit hook
- Browser: **Chromium** (Desktop Chrome, 1920×1080)
- Reports: **HTML** (`playwright-report/`), **JSON** and **JUnit** (`test-results/`)

## How I Tested Login exept happy flow

I tested **valid username and invalid password** to make sure the system correctly rejects a login when the user exists but the password is wrong.

I do **not test invalid username with a valid password** because there are only two possible situations for that scenario.  
First, the account does **not exist**, so there is nothing meaningful to test.  
Second, the account **exists but belongs to another user**. In that case, my password would still be incorrect for that account, which is already covered by the **valid username + invalid password** test.

I also do **not test invalid username and invalid password**, because these conditions are already covered. The invalid password case is already tested, and testing an non-existing username does not add additional value.

I also verified that the **password field has type `password`**, which ensures that the password input is **masked with asterisks (hidden characters)** when the user types it.

I do **not test empty username and empty password separately**, because that would only reveal a completely broken validation. If validation were broken, the issue would already be detected when testing **invalid password**, since the system should reject incorrect credentials.

For this reason, an **empty password is considered part of the invalid password equivalence class**. Different invalid password values (including empty values) are **randomly selected from this class in different test runs**.

I use **labels as locators** when finding elements on the login page. This approach automatically verifies that the **label text is correct** and also confirms the **presence of a proper label for accessibility**. 

In addition, I run the tests in **multiple browsers**.
