var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			fallback: './index.html',
			livereload: false,
			directoryListing: true,
			open: true
		}));
});