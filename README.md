# Magento Test Automation with Playwright

This project contains automated tests for the [Magento Demo Website](https://magento.softwaretestingboard.com/).  
I use Playwright for browser automation.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- NPM (Node Package Manager)

### Installation
1. Clone this repository to your local environment.
   ```bash
    git clone <repository-url>
    cd <repository-directory>
   ```
2. Install the project dependencies.
   ```bash
    npm install
   ```
## Playwright Setup
If you're running Playwright for the first time, ensure the necessary browser binaries are installed.
   ```bash
    npx playwright install
   ```

## Running Tests
### Run All Tests
To run all tests, simply execute:
   ```bash
    npx playwright test
   ```  
   or  
   ```bash
    npm test
   ```
### Run Specific Test
To run a specific test by its filename, use:
   ```bash
    npx playwright test tests/signin.spec.js
   ```
## Test Reports
### Generate and View Test Report
By default, the tests generate an HTML report. To view the report:
#### 1. Run the tests.
   ```bash
    npx playwright test
   ```
#### 2. Open the HTML report.
   ```bash
    npx playwright show-report test-reports
   ```
   or  
   ```bash
    npm run test-report
   ```
