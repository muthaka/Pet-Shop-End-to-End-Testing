const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Pet-Shop Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
  },
  e2e: {
    baseUrl: 'https://pet-shop.buckhill.com.hr',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
