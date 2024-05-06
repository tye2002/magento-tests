import { test, expect } from '@playwright/test';
import Homepage from '../page-objects/Homepage.js';

test.describe('Homepage Tests', () => {
  let homepage;

  // Set up homepage object before each test
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.goto();
  });

  test('Homepage should load and have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Home Page/);
  });

  test('Homepage logo should be visible', async ({ page }) => {
    const isLogoVisible = await homepage.isLogoVisible();
    await expect(isLogoVisible).toBeTruthy();
  });

  test('Search bar should be visible', async ({ page }) => {
    const isSearchBarVisible = await homepage.isSearchBoxVisible();
    await expect(isSearchBarVisible).toBeTruthy();
  });

  test('Search functionality should return results', async ({ page }) => {
    await homepage.search('jacket');
    const searchResults = page.locator('.products-grid');
    await expect(searchResults).toBeVisible();
  });

  test('Navigation bar links should work', async ({ page }) => {
    const navItems = await homepage.getNavItems();
    await expect(navItems).toHaveCount(6);

    await homepage.clickNavItem('Men');
    await expect(page).toHaveTitle(/Men/);
  });
});
