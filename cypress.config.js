const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        apiBaseUrl: 'https://api.prodmap.ai'
      };

      return config;
    },
  },
});
