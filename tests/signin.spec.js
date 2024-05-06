import { test, expect } from '@playwright/test';
import SigninPage from '../page-objects/SigninPage';
import { 
  TEST_USER_EMAIL, TEST_USER_PWD,
  INVALID_EMAIL_ERROR_MSG, REQUIRE_FIELD_ERROR_MSG, INVALID_ACCOUNT_ERROR_MSG
 } from '../config/constants';

test.describe('Signin Tests', () => {
  let signinPage;

  // Set up SigninPage object before each test
  test.beforeEach(async ({ page }) => {
    signinPage = new SigninPage(page);
    await signinPage.goto();
  });

  test('Successful signin with valid credentials', async ({ page }) => {
    await signinPage.signin(TEST_USER_EMAIL, TEST_USER_PWD);
    await expect(page).toHaveTitle(/My Account/);
  });

  test('Signin with required fields empty should fail', async ({ page }) => {
    await signinPage.signin('', '');

    const emailErrorMsg = await signinPage.getEmailErrorMsg();
    await expect(emailErrorMsg).toHaveText(REQUIRE_FIELD_ERROR_MSG);
    const pwdErrorMsg = await signinPage.getPwdErrorMsg();
    await expect(pwdErrorMsg).toHaveText(REQUIRE_FIELD_ERROR_MSG);
  });

  test('Signin with invalid email should fail', async ({ page }) => {
    await signinPage.signin('invalidemail', TEST_USER_PWD);

    const emailErrorMsg = await signinPage.getEmailErrorMsg();
    await expect(emailErrorMsg).toHaveText(INVALID_EMAIL_ERROR_MSG);
  });

  test('Signin with non-existent account should fail', async ({ page }) => {
    await signinPage.signin('nonexistent@example.com', 'wrongpassword');

    const accountErrorMsg = await signinPage.getSigninFailMsg();
    await expect(accountErrorMsg).toHaveText(INVALID_ACCOUNT_ERROR_MSG);
  });

});
