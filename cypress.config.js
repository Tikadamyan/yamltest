const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const apiBaseUrl = process.env.API_URL || "https://api.dev.prodmap.ai";

      let workspaceId;

      if (apiBaseUrl === "https://api.prodmap.ai") {
        workspaceId = "1581"; // PROD
      } else if (apiBaseUrl === "https://api.dev.prodmap.ai") {
        workspaceId = "1440"; // DEV
      }

      config.env.apiBaseUrl = apiBaseUrl;
      config.env.workspaceId = workspaceId;

      console.log(`Using API URL: ${apiBaseUrl}`);
      console.log(`Using workspaceId: ${workspaceId}`);

      return config;
    },
  },
});
