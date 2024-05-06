import { test, expect } from '@playwright/test';
import SignupPage from '../page-objects/SignupPage.js';
import { generateRandomEmail } from '../utils/random.js';
import { 
  TEST_USER_EMAIL,
  EXISTED_EMAIL_ERROR_MSG, 
  WEAK_PWD_ERROR_MSG,
  MISMATCH_PWD_CONFIRM_ERROR_MSG
 } from '../config/constants.js';

const firstName = 'Iris';
const lastName = 'Huynh';
const email = generateRandomEmail(); // Ensure unique email
const password = 'SecurePass123!';

test.describe('Signup Tests', () => {
  let signupPage;

  // Set up SignupPage object before each test
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.goto();
  });

  test('User can sign up successfully with valid information', async ({ page }) => {
    await signupPage.signup(firstName, lastName, email, password);
    await expect(page).toHaveTitle(/My Account/);
  });

  test('Signup with existing email should fail', async ({ page }) => {
    await signupPage.signup(firstName, lastName, TEST_USER_EMAIL, password);

    const signupFailMsg = await signupPage.getSignupFailMsg();
    await expect(signupFailMsg).toContainText(EXISTED_EMAIL_ERROR_MSG)
  });

  test('Signup with weak password should fail', async ({ page }) => {
    const email = generateRandomEmail();
    await signupPage.signup(firstName, lastName, email, '1234'); // Weak password

    const weakPwdErrorMsg = await signupPage.getPwdErrorMsg();
    await expect(weakPwdErrorMsg).toHaveText(WEAK_PWD_ERROR_MSG)
  });

  test('Mandatory fields should be validated', async ({ page }) => {
    await signupPage.signup('','','',''); // Try to submit without filling fields

    const errorFields = await signupPage.getErrorFields()
    await expect(errorFields).toHaveCount(5);
  });

  test('Password confirmation mismatch should fail', async ({ page }) => {
    const email = generateRandomEmail();
    await signupPage.signupWithConfirmation(firstName, lastName, email, password, 'MismatchPass!');

    const mismatchPwdConfirmErrorMsg = await signupPage.getPwdConfirmErrorMsg();
    await expect(mismatchPwdConfirmErrorMsg).toHaveText(MISMATCH_PWD_CONFIRM_ERROR_MSG)
  });
});
