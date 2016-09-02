'use strict';

let path = require('path');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
	entry: './src/ReactNavigationView.js',
	output: {
		path: path.join(__dirname, '/../lib'),
		filename: 'ReactNavigationView.js',
		libraryTarget: 'commonjs2'
	},
	externals: {
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	},
	// cache: true,
	devtool: 'source-map',
	plugins: [],
	module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders = [{
	test: /\.(js|jsx)$/,
	loader: 'babel',
	exclude: /node_modules/
}];

module.exports = config;
