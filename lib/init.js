const path = require('path');
const fs = require('fs-extra');

const DEFAULT_SERVER = 'https://rally1.rallydev.com';
const DEFAULT_SDK = '3.0.0';

const appPath = path.resolve(process.cwd());
const craPath = path.join(path.resolve(__dirname), '..');

function init({ name, sdk, server }) {
  //TODO: templatify (things like server, etc.)
  fs.copySync(path.join(craPath, 'templates', 'new'), appPath);
}

module.exports = {
  init
};