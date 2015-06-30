'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

// JSHint task. Using stylish for better formatting.
gulp.task('lint', function() {

	gulp.src('scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));

});