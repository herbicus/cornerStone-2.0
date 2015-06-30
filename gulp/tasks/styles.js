'use strict';

var gulp 	  	= require('gulp'),
	sass 	  	= require('gulp-sass'),
	rename 	  	= require('gulp-rename'),
	minifycss 	= require('gulp-minify-css'),
	browserSync = require('browser-sync');

gulp.task('styles', function() {
	return gulp.src('./styles/app.scss')
		.pipe(sass({ sourceComments: 'map'}))
		.pipe(gulp.dest('./www/css/'))
		.pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
	    .pipe(gulp.dest('./www/css/'))
	    .pipe(browserSync.stream());
});
