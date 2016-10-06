module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-animate/angular-animate.js',
			'node_modules/angular-aria/angular-aria.js',
			'node_modules/angular-material/angular-material.js',
			'node_modules/satellizer/dist/satellizer.min.js',
			'node_modules/angular-ui-router/release/angular-ui-router.min.js',
			'node_modules/angular-filter/dist/angular-filter.min.js',
			'js/**/*.js',
			'test/unit/**/*.js'
		],
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS'],

		//coverage config
		reporters: ['progress', 'coverage'],

		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'js/**/*.js': ['coverage']
		},

		// optionally, configure the reporter
		coverageReporter: {
			type : 'html',
			dir : 'test/coverage/'
		}
	});
};
