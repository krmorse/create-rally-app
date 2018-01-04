# Create Rally App

Create Rally App is a [Node.js](http://nodejs.org/) command line utility for building apps using the upcoming React-based App SDK 3.0.

## Installation

Create Rally App is most easily used when installed globally:

`npm install -g create-rally-app`

However, if that does't work (permission errors, etc.) it can be installed locally as well:

`npm install create-rally-app`

## API

  Usage: create-rally-app [command] [options]

  Commands:

    init [--name] [--sdk] [--server]
    Creates a new Rally app project

    build
    Builds the current app

    run [--port]
    Starts a local server and launches the app in the default browser

    watch [--ci]
    Automatically builds the App when files are changed

    test [--debug] [--spec]
    Runs the app tests

  Options:

    -h, --help     output usage information
    -v, --version  output the version number


## Commands

### init
`create-rally-app init --name=myNewApp`
Creating a new Rally App is as easy as using init. The init command creates you a  After init creates your App it will automatically run the build command on it for you.

The init command takes a few parameters.  
*  name : The first is the name for your new App.
    *  `create-rally-app init --name=myNewApp`
*  sdk(optional) : The version of the SDK your App will be created against.
    *  `create-rally-app init --name=myNewApp --sdk=3.0`
*  server(optional) : The server you want the debug file to point to. The command below will create a new App using version 2.0 and pointing to the server myownRally.com
    *  `create-rally-app init --name=myNewApp --sdk=2.1 --server=https://myOwnRally.com`

### build

Use the build command to compile your App into a single HTML file that can be copy and pasted into a Rally [Custom HTML App](http://www.rallydev.com/custom-html)
Run this command before you check your file into source control or whenever you make a change to your config.json file.

### run
`create-rally-app run`

The run command starts a local http server and launches your App-debug.html file in the default browser for quick an easy development.
By default the server listens on port 1337.  This can be changed as follows:

`create-rally-app run --port=9999`

### watch
`create-rally-app watch [--templates] [--ci]`

The watch command listens for changes to app files and automatically rebuilds the app.
If the optional `--ci` flag is passed the tests will also be run.

### test
`create-rally-app test [--debug] [--spec]`

The test command runs the tests.  By default all tests will be run headlessly.
If the `--debug` flag is specified the tests will be run in the default browser instead.
If the `--spec` flag is specified only the test(s) matching the specified file pattern will be run.

The [Testing Apps](https://help.rallydev.com/apps/2.1/doc/#!/guide/testing_apps) guide in the App SDK help documentation is a great resource to learn how to get started writing tests for your apps.