var url = require('url');
var path = require('path');
var webpack = require('webpack');
var shared = require('./shared');

const wsUrl = url.parse(process.env.DATABASE_WS || 'http://localhost/db');
const dbUrl = url.parse(process.env.DATABASE_URL || 'rdb://localhost:28015/test');

var config = {
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: [
    'babel-polyfill',
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/client.js'
  ],
  output: {
    path: path.resolve('./build'),
    filename: 'client.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      _isDev: (process.env.NODE_ENV === 'development'),
      _isClient: true,
      _dbName: JSON.stringify(dbUrl.path.substr(1)),
      _wsPath: JSON.stringify(wsUrl.path),
    }),
    shared.plugins.provide,
    shared.plugins.extract,
  ],
  resolve: shared.resolve,
  module: { loaders: shared.loaders }
};

if (process.env.NODE_ENV === 'production') {
  // Strip Hot Module Replacement
  config.entry = config.entry.filter(name => name !== 'webpack-hot-middleware/client');
  config.debug = false;
  config.devtool = undefined;
} else {
  // Add hot module replacement
  config.plugins.splice(0, 0, new webpack.HotModuleReplacementPlugin());
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
