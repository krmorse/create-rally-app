const webpack = require('webpack');
const webpackConfigFn = require('./webpack.config.js');
const path = require('path');
const fs = require('fs');

function getPackageJson() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
}

function buildAll() {
  return build({ mode: 'dev' }).then(() => {
    return build({ mode: 'deploy' });
  });
}

function build({ mode = 'deploy' }) {
  const packageJson = getPackageJson();
  const webpackConfig = webpackConfigFn({ packageJson, mode });

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        const info = stats.toJson();

        if (stats.hasErrors()) {
          console.error(info.errors);
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }
        reject(err || info.errors);
      }
      else {
        resolve();
      }
    });
  });
}

module.exports = {
  build,
  buildAll
};