var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	source 		= require('vinyl-source-stream'),
	uglify 		= require('gulp-uglify'),
	streamify 	= require('gulp-streamify'),
	sass 		= require('gulp-sass'),
	connect 	= require('gulp-connect');

gulp.task('html', function () {
	gulp.src('*.html')
    	.pipe(connect.reload());
});

gulp.task('js', function() {
	return browserify('./assets/js/build/index.js')
		.bundle()
		.pipe(source('./assets/js/main.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('assets/sass/styles.scss')
		.pipe(sass({ sourceComments: 'map'}))
		.pipe(gulp.dest('assets/css'))
		.pipe(connect.reload());

});

// TASKS

// gulp watch
gulp.task('watch', function() {
	gulp.watch('assets/js/**/*.js', ['js']);
	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
    	root: 'assets',
    	livereload: true
    });
});


// gulp
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch'] );




