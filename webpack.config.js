'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    // Server Configuration options
    devServer: {
      contentBase: 'src/', // Relative directory for base of server
      devtool: 'eval',
      hot: true, // Live-reload
      inline: true,
      port: 8080, // Port Number
      host: '0.0.0.0',
    },
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'src/assets', 
        to: 'assets'
      }]),
      new HtmlWebpackPlugin({
        template: 'src/index.tpl.html',
        inject: 'body',
        filename: 'index.html'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
        ]
    }
};
