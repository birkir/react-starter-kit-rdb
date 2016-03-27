var path = require('path');
var webpack = require('webpack');
var shared = require('./shared');

shared.envs.CLIENT = true;

var config = {
  context: path.join(__dirname, '../src'),
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: [
    'babel-polyfill',
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './client'
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'client.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': shared.envs }),
    shared.plugins.provide,
    shared.plugins.extract,
  ],
  resolve: shared.resolve,
  module: { loaders: shared.loaders }
};

if (process.env.NODE_ENV === 'production') {
  // Strip Hot Module Replacement
  config.entry = config.entry.filter(name => name !== 'webpack-hot-middleware/client');
  config.plugins = config.plugins.slice(1);
  config.debug = false;
  config.devtool = undefined;
} else {
  // Find specific loaders
  const loaders = shared.mapLoaders(config.module.loaders);

  if (loaders.js) {
    loaders.js.query.presets.push('react-hmre');
  }

  if (loaders.css) {
    loaders.css.loader = `style-loader!${shared.cssLoader}`;
  }
}

module.exports = config;
