const packageJson = require('./package.json');
const appJson = require('./app.json');

module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    name: packageJson.name,
    version: packageJson.version,
    slug: packageJson.name,
  }
};
