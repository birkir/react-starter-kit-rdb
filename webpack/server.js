var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isDev = (process.env.NODE_ENV === 'development');

if (isDev) {
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
    path: path.resolve('./build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      _isDev: isDev,
      _isClient: false,
    }),
    shared.plugins.provide,
    shared.plugins.extract,
  ],
  resolve: shared.resolve,
  module: { loaders: shared.loaders }
};

module.exports = config;
