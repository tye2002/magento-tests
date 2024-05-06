// page-objects/SigninPage.js
import { BASE_URL } from '../config/constants.js';

//locator
const TXT_EMAIL = '#email'
const TXT_PWD = '#pass'
const BTN_SIGNIN = '#send2'
const MSG_EMAIL_ERROR = '#email-error'
const MSG_PWD_ERROR = '#pass-error'
const MSG_SIGNIN_FAIL = '.message-error'

export default class SigninPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/customer/account/login`);
  }

  async signin(email, password) {
    await this.page.fill(TXT_EMAIL, email);
    await this.page.fill(TXT_PWD, password);
    await this.page.click(BTN_SIGNIN);
  }

  async getEmailErrorMsg() {
    return await this.page.locator(MSG_EMAIL_ERROR);
  }

  async getPwdErrorMsg() {
    return await this.page.locator(MSG_PWD_ERROR);
  }

  async getSigninFailMsg() {
    return await this.page.locator(MSG_SIGNIN_FAIL);
  }
}
