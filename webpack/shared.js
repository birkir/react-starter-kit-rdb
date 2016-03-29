var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var shared = {};

shared.resolve = {
  modulesDirectories: ['web_modules', 'node_modules', './src', './src/components'],
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
  exclude: /node_modules/,
}, {
  is: 'css',
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', shared.cssLoader),
  exclude: /node_modules/,
}];

shared.plugins = {
	provide: new webpack.ProvidePlugin({
    React: 'react'
  }),
  extract: new ExtractTextPlugin('styles.css', { allChunks: true })
}

module.exports = shared;
