var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	eslint = require('gulp-eslint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps'),
	karmaServer = require('karma').Server;

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


gulp.task('concat-src', function () {
	gulp.src(['js/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('src.js'))
		.pipe(ngAnnotate())
		.pipe(uglify({mangle: false}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('.'));
});

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			fallback: './index.html',
			livereload: false,
			directoryListing: true,
			open: true
		}));
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

gulp.task('build', ['check-style', 'test', 'concat-src'], function() {
	// This will only run if is successful...
});