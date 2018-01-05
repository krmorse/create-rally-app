const { exec } = require('child_process');
const path = require('path');

const DEFAULT_PORT = 3000;
const craPath = path.resolve(path.join(__dirname, '..'));
const configPath = path.join(craPath, 'lib', 'webpack.config.dev.js');

function run({ port = DEFAULT_PORT }) {
  //TODO: shouldn't need to drop into node_modules/.bin to execute this
  const webpackDevServerPath = path.join(craPath, 'node_modules', '.bin', 'webpack-dev-server');
  //TODO: enable hot module reloading and get rid of --watchContentBase
  exec(
    `${webpackDevServerPath} --open --config="${configPath}" --port=${port} --watchContentBase`,
    {},
    (err, stdout, stderr) => {
      if (err) {
        console.log('err', err);
        // node couldn't execute the command
        return;
      }
    });
}

module.exports = {
  run
};