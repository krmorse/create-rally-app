const webpackConfigFn = require('./webpack.config.js');

module.exports = webpackConfigFn({ mode: 'deploy' });