const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true,
    }
  },
  fixturesFolder: false,
  screenshotsFolder: false,
  video: false,
});
