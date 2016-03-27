var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var shared = {};

shared.envs = {
  NODE_ENV:      JSON.stringify(process.env.NODE_ENV      || 'development'),
  PORT:          JSON.stringify(process.env.PORT          || 3000),
  HOSTNAME:      JSON.stringify(process.env.HOSTNAME      || 'localhost'),
  SECRET:        JSON.stringify(process.env.SECRET),
  DATABASE_URL:  JSON.stringify(process.env.DATABASE_URL  || 'rdb://localhost:28015/test'),
  DATABASE_WS:   JSON.stringify(process.env.DATABASE_WS   || 'http://localhost:3000/db'),
};

shared.resolve = {
  modulesDirectories: ['../node_modules', './components', './'],
  extensions: ['', '.js', '.json', '.css']
};

shared.cssLoader = 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]';

shared.mapLoaders = loaders => {
  const result = {};
  loaders.forEach(item => {
    if (item.hasOwnProperty('is')) {
      result[item.is] = item;
    }
  });
  return result;
};

shared.loaders = [{
  is: 'js',
  test: /\.js/,
  loader: 'babel',
  query: {
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy']
  },
  exclude: /node_modules|build/
}, {
  is: 'css',
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', shared.cssLoader),
  exclude: /node_modules|build/
}];

shared.plugins = {
	provide: new webpack.ProvidePlugin({
    React: 'react'
  }),
  extract: new ExtractTextPlugin('style.css', { allChunks: true })
}

module.exports = shared;
