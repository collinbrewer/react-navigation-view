'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
  entry: {
	  index: [
	    'webpack-dev-server/client?http://localhost:' + defaultSettings.port,
	    'webpack/hot/only-dev-server',
	    './example/src/index.js'
	 ]
	//  ReactNavigationView: ['./src/ReactNavigationView.js']
 },
  // cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  //   new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  exclude: /node_modules/
  // include: [].concat(
  //   config.additionalPaths,
  //   [ path.join(__dirname, '/../../example/src') ]
  // )
});

module.exports = config;
