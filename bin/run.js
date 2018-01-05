const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const CreateRallyApp = require('../lib/');

const errorHandler = function(error) {
  if (error) {
    console.error(`\r\n${error[0] || error}`);
    return console.error('\r\nBuild aborted due to error.');
  } else {
    return console.log('Success');
  }
};

function build(args) {
  // console.log('Compiling the App.');
  return CreateRallyApp.Build.buildAll().then(() => {
    console.log('Success');
  }, errorHandler);
};

const init = function(args) {
  const {name, sdk, server} = args;
  console.log('Creating a new App.');
  return CreateRallyApp.Init.init(
    {name, sdk, server},
    function(error) {
      if (error) {
        return errorHandler(error);
      } else {
        return build({templates});
      }
  });
};


const watch = function(args) {
  const {templates, ci} = args;
  return CreateRallyApp.watch({templates, ci});
};

const run = function(args) {
  const {port} = args;
  port = args._[1] || port;
  return CreateRallyApp.run({port});
};

const test = function(args) {
  const {debug, spec} = args;
  return CreateRallyApp.test({debug, spec});
};

yargs
  .command(
    'init',
    'Creates a new Rally App project template.', {
    name: {alias: 'n', describe: 'The name of the app'},
    sdk: {alias: 's', describe: 'The SDK version to target', default: '2.1'},
    server: {alias: 'r', describe: 'The server to target'},
    templates: {alias: 't', describe: 'The path containing custom html output templates (advanced)'}
  }
    , init
  )
  .command(
    'build',
    'Builds the current App.',
    {}, 
    build
  )
  .command(
    'watch',
    'Watch the current app files for changes and automatically rebuild it.', {
    templates: {alias: 't', describe: 'The path containing custom html output templates (advanced)'},
    ci: { alias: 'c', describe: 'Also run the tests on each change after rebuilding the app'}
  }
    , watch
  )
  .command(
    'run',
    'Start a local server and launch the current app in the default browser.',
    {port: {alias: 'p', default: 1337, describe: 'The port on which to start the local http server'}}
    , run
  )
  .command(
    'test',
    'Run the tests for the current app.', {
    debug: {alias: 'd', describe: 'If specified tests will be run in the default browser rather than headlessly.'},
    spec: {alias: 's', describe: 'Specific test file name or glob pattern to run.  If not specified all tests will be run.'}
  }
    , test
  )
  .help().alias('h', 'help')
  .version().alias('v', 'version')
  .argv;