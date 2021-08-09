// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      headless: false,
      screenshot: 'off',
      viewport: { width: 1280, height: 720 },
      //launchOptions: { slowMo: 750}
    },
  };
  
  module.exports = config;