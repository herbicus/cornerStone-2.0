'use strict';

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

// Browserify task
gulp.task('browserify', function() {

  // App entry point
  gulp.src(['scripts/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
  }))

  // Bundle
  .pipe(concat('app.js'))

  .pipe(uglify())

  // Distrubute
  .pipe(gulp.dest('www/js'));

  gulp.src(['scripts/vendor.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: false
  }))

  .pipe(concat('vendor.js'))

  .pipe(uglify())

  // Distrubute
  .pipe(gulp.dest('www/js'));

});