var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').config({ silent: true });

var shared = require('./shared');

var config = {
  context: path.join(__dirname, '../src'),
  debug: false,
  devtool: undefined,
  externals: /^[a-z\-0-9]+$/,
  entry: [
    'babel-polyfill',
    './server',
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({ 'process.env': shared.envs }),
    shared.plugins.provide,
    shared.plugins.extract,
  ],
  resolve: shared.resolve,
  module: { loaders: shared.loaders }
};

module.exports = config;
