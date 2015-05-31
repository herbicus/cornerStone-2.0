var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	source 		= require('vinyl-source-stream'),
	uglify 		= require('gulp-uglify'),
	streamify 	= require('gulp-streamify'),
	sass 		= require('gulp-sass'),
	connect 	= require('gulp-connect');

gulp.task('html', function () {
	gulp.src('./app/*.html')
    	.pipe(connect.reload());
});

gulp.task('js', function() {
	return browserify('./app/assets/js/build/index.js')
		.bundle()
		.pipe(source('./app/assets/js/main.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('.'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('app/assets/sass/styles.scss')
		.pipe(sass({ sourceComments: 'map'}))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(connect.reload());

});

// TASKS

// gulp watch
gulp.task('watch', function() {
	gulp.watch('app/assets/js/**/*.js', ['js']);
	gulp.watch('app/assets/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
    	root: 'app',
    	livereload: true
    });
});


// gulp
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch'] );




