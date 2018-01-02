const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//todo: get from rally section of package.json
const server = 'https://rally1.rallydev.com';

module.exports = {
    entry: './src/index.js',
    externals: {
        'rally-sdk': 'Rally',
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        openPage: 'App.html',
        port: 9000,
        proxy: {
            '/slm': {
                target: server,
                changeOrigin: true,
            }
        }
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
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./html/App.html",
            filename: './App.html'
        }),
        new CopyWebpackPlugin([
            { from: './node_modules/rally-sdk/dist/', to: 'lib/sdk' },
        ])
    ]
};