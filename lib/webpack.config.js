const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TidyHtmlWebpackPlugin = require('tidy-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const DEFAULT_SERVER = 'https://rally1.rallydev.com';
const appPath = path.resolve(process.cwd());
const craPath = path.join(path.resolve(__dirname), '..');
const templatePath = path.join(craPath, 'templates');

//TODO: move this mode specific stuff into the respective web.config.[mode].js files
function getPlugins({ templatePath, appPath, mode, templateOptions }) {
  let plugins = [
    new ExtractTextPlugin('appstyles.css')
  ];

  if (mode === 'dev') {
    plugins.push(new HtmlWebPackPlugin({
      template: path.join(templatePath, 'html', 'App-dev.html'),
      filename: path.join(appPath, 'dist', 'App-dev.html'),
      inject: 'head',
      ...templateOptions
    }), )
  } else if (mode === 'deploy') {
    plugins = plugins.concat([
      new HtmlWebPackPlugin({
        template: path.join(templatePath, 'html', 'App.html'),
        //todo would be great to put in deploy dir, but scriptext fails if it's in a different dir
        //maybe we can just do the copy plugin to move it to the right place afterwards?  seems kinda poopy
        filename: path.join(appPath, 'dist', 'App.html'),
        inject: 'head',
        minify: {
          minifyJS: true,
          minifyCSS: true
        },
        ...templateOptions
      }),
      new StyleExtHtmlWebpackPlugin(),
      new ScriptExtHtmlWebpackPlugin({
        inline: /\.js$/
      })
    ]);
  }

  plugins.push(new TidyHtmlWebpackPlugin());

  return plugins;
}

function getPackageJson() {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
}

module.exports = ({ mode }) => {
  const packageJson = getPackageJson();
  const server = (packageJson.rally && packageJson.rally.server) || DEFAULT_SERVER;
  const appName = packageJson.name;
  const sdkVersion = packageJson.devDependencies['rally-sdk'];
  const appEntry = packageJson.main;

  //todo: once hosted somewhere, use these paths:
  //const sdkJsPath = `${server}/apps/${sdkVersion}/sdk.js 
  //const sdkCssPath = `${server}/apps/${sdkVersion}/sdk.css 

  //until then, hard code for local environment:
  const sdkJsPath = 'http://localhost:3000/sdk.js';
  const sdkCssPath = 'http://localhost:3000/sdk.css';

  const templateOptions = {
    sdkJsPath,
    sdkCssPath,
    appName
  };

  return {
    entry: path.join(appPath, appEntry),
    resolve: {
      modules: [
        appPath,
        path.join(craPath, 'node_modules'),
        path.join(appPath, 'node_modules'),
      ]
    },
    resolveLoader: {
      modules: [
        path.join(craPath, 'node_modules'),
      ]
    },
    externals: {
      'rally-sdk': 'Rally',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'immutable': 'Immutable',
      'react-immutable-proptypes': 'ImmutablePropTypes',
      'prop-types': 'PropTypes'
    },
    output: {
      path: path.resolve(appPath, 'dist'),
      filename: 'js/[name].js'
    },
    devServer: {
      contentBase: path.join(appPath, 'dist'),
      openPage: 'App-dev.html'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            //Note: the .map(require.resolve) should not be necessary here...
            //https://github.com/webpack/webpack/issues/1866
            presets: [
              'babel-preset-env',
              'babel-preset-react'
            ].map(require.resolve),

            //Note: the .map(require.resolve) should not be necessary here...
            //https://github.com/webpack/webpack/issues/1866
            plugins: ['babel-plugin-transform-class-properties'].map(require.resolve)
          }
        },
        {
          test: /\.(s*)css$/,
          use: ExtractTextPlugin.extract({
            filename: 'appstyles.css',
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins: getPlugins({ mode, templateOptions, templatePath, appPath })
  };
};