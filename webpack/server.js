var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ silent: true });
}

var shared = require('./shared');

var config = {
  debug: false,
  devtool: undefined,
  externals: /^[a-z\-0-9]+$/,
  entry: [
    'babel-polyfill',
    './src/server.js',
  ],
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      _isDev: (process.env.NODE_ENV === 'development'),
      _isClient: false,
    }),
    shared.plugins.provide,
    shared.plugins.extract,
  ],
  resolve: shared.resolve,
  module: { loaders: shared.loaders }
};

module.exports = config;
