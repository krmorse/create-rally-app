const webpack = require('webpack');
const webpackConfigFn = require('./webpack.config.js');
const path = require('path');
const fs = require('fs');

function buildAll() {
  console.log('Packaging App-dev.html...');
  return build({ mode: 'dev' }).then(() => {
    console.log('Packaging App.html...');
    return build({ mode: 'deploy' });
  });
}

function build({ mode = 'deploy' }) {
  const webpackConfig = webpackConfigFn({ mode });

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