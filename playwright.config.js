const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1, // Can change this based on your needs
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  // Configure the report output
  reporter: [
    ['list'], // Simple console output
    ['html', { outputFolder: 'test-reports', open: 'never' }], // HTML report
  ],
  fullyParallel: true,
});