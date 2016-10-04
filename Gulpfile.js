'use-strict';

var gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'),
	karmaServer = require('karma').Server,
	connect = require('gulp-connect'),
	exec = require('child_process').exec,
	guppy = require('git-guppy')(gulp);

/**
 * Run eslint on source code to check code style.
 */
gulp.task('check-style', function() {
	return gulp.src('js/**/*.js')
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

/**
 * concat and uglify source code to one file.
 */
gulp.task('concat-src', function () {
	gulp.src(['js/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('src.js'))
		.pipe(ngAnnotate())
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('.'));
});

/**
 * Run webserver to run app.
 */
gulp.task('connect', function() {
	connect.server({
		name: 'Takeaway App',
		port: 8000,
		fallback: 'index.html'
	});
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
	new karmaServer({
		configFile: __dirname + '/test/config/karma.conf.js',
		singleRun: true
	}, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
	new karmaServer({
		configFile: __dirname + '/test/config/karma.conf.js'
	}, done).start();
});

gulp.task('node-server', function (cb) {
	exec('mongod --dbpath ./data', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
	exec('node server/node/server.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('build', ['check-style', 'test', 'concat-src'], function() {
	// This will only run if is successful...
});

gulp.task('start', ['build', 'connect', 'node-server'], function () {

});

gulp.task('pre-commit', ['check-style', 'test']);

gulp.task('pre-push', ['check-style', 'test']);
