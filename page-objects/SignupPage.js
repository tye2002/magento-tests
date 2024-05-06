// page-objects/SignupPage.js
import { BASE_URL } from '../config/constants.js';

//locator
const MSG_PWD_ERROR = '#password-error'
const MSG_PWD_CONFIRM_ERROR = '#password-confirmation-error'
const MSG_SIGNUP_FAIL = '.message-error'

export default class SignupPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/customer/account/create`);
  }

  async signup(firstName, lastName, email, password) {
    await this.page.fill('#firstname', firstName);
    await this.page.fill('#lastname', lastName);
    await this.page.fill('#email_address', email);
    await this.page.fill('#password', password);
    await this.page.fill('#password-confirmation', password);
    await this.page.click('button[title="Create an Account"]');
  }

  async signupWithConfirmation(firstName, lastName, email, password, passwordConfirmation) {
    await this.page.fill('#firstname', firstName);
    await this.page.fill('#lastname', lastName);
    await this.page.fill('#email_address', email);
    await this.page.fill('#password', password);
    await this.page.fill('#password-confirmation', passwordConfirmation);
    await this.page.click('button[title="Create an Account"]');
  }

  async getPwdErrorMsg() {
    return await this.page.locator(MSG_PWD_ERROR);
  }

  async getPwdConfirmErrorMsg() {
    return await this.page.locator(MSG_PWD_CONFIRM_ERROR);
  }

  async getSignupFailMsg() {
    return await this.page.locator(MSG_SIGNUP_FAIL);
  }

  async getErrorFields() {
    return this.page.locator(`//div[contains(@id,'error')]`);
  }
}
