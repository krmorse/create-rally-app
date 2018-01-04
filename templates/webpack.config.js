const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TidyHtmlWebpackPlugin = require('tidy-html-webpack-plugin');

//todo: get from rally section of package.json
const server = 'https://rally1.rallydev.com';

//todo: do not hardcode
//const sdkJsPath = `${server}/apps/${sdkVersion}/sdk.js 
//const sdkCssPath = `${server}/apps/${sdkVersion}/sdk.css 
const sdkJsPath = 'https://localhost:3000/sdk.js';
const sdkCssPath = 'https://localhost:3000/sdk.css';
const appName = 'My App';

const templateOptions = {
  sdkJsPath,
  sdkCssPath,
  appName
};

module.exports = {
    entry: './src/index.js',
    externals: {
        'rally-sdk': 'Rally',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'immutable': 'Immutable',
        'react-immutable-proptypes': 'ImmutablePropTypes',
        'prop-types': 'PropTypes'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        openPage: 'App-dev.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
              test:/\.(s*)css$/,
              use: ExtractTextPlugin.extract({
                filename: 'appstyles.css',
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
           }
        ]
    },
    plugins: [
        new ExtractTextPlugin('appstyles.css'),
        new HtmlWebPackPlugin({
            template: "./html/App-dev.html",
            filename: './App-dev.html',
            inject: 'head',
            ...templateOptions
        }),
        new HtmlWebPackPlugin({
          template: "./html/App-deploy.html",
          filename: './App-deploy.html',
          inject: 'head',
          inlineSource: '.(js|css)$',
          minify: {
            minifyJS: true,
            minifyCSS: true
          },
          ...templateOptions
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new TidyHtmlWebpackPlugin()
    ]
};