// Karma configuration
// Generated on Wed Jul 20 2016 12:51:55 GMT-0500 (CDT)

var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
	'jsdom': 'window',
	'cheerio': 'window',
	'react/lib/ExecutionEnvironment': true,
	'react/lib/ReactContext': 'window'
};

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			'mocha',
			'chai',
			'sinon'
		],

		// list of files / patterns to load in the browser
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			{
				pattern: 'tests/**',
				watched: false,
				served: true,
				included: true
			}
		],

		// list of files to exclude
		exclude: [],

		preprocessors: {
			'tests/**/*.js': ['webpack', 'sourcemap'], // 'coverage' // preprocess matching files before serving them to the browser
			'/src/**/*.js': 'coverage'
		},

		// optionally, configure the reporter
		coverageReporter: {
			dir: 'coverage',
			reporters: [{
				type: 'lcov',
				subdir: '.'
			}, {
				type: 'text-summary'
			}, {
				type: 'text'
			}, {
				type: 'cobertura',
				subdir: '.',
				file: 'coverage.xml'
			}]
		},

		reporters: ['mocha'], // ['mocha', 'coverage'], // possible values: 'dots', 'progress'
		// mochaReporter: {
		// 	output: 'minimal',
		// 	showDiff: true
		// },

		port: 9877,
		colors: true,
		logLevel: config.LOG_INFO, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-sinon',
			'karma-webpack',
			// 'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-sourcemap-loader',
			'karma-coverage',
			'karma-mocha-reporter'
		],

		webpack: webpackConfig,

		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only'
		},
		concurrency: Infinity
	});
};
