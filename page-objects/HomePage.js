// page-objects/Homepage.js
import { BASE_URL } from '../config/constants.js';

// locator
const LOGO = 'a.logo'
const SEARCH_BOX = '#search'
const NAV_BAR = '.navigation > ul > li'

export default class Homepage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/`);
  }

  async isLogoVisible() {
    const logo = this.page.locator(LOGO);
    return await logo.isVisible();
  }
  async isSearchBoxVisible() {
    const searchbox = this.page.locator(SEARCH_BOX);
    return await searchbox.isVisible();
  }

  async search(query) {
    const searchBox = this.page.locator(SEARCH_BOX);
    await searchBox.fill(query);
    await searchBox.press('Enter');
  }

  async getNavItems() {
    return this.page.locator(NAV_BAR);
  }

  async clickNavItem(name) {
    await this.page.locator(`//span[text()='${name}']`).click();
  }
}
