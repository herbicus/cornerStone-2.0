'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

//process.env.BROWSERIFYSHIM_DIAGNOSTICS=1

// Browserify task
gulp.task('browserify', ['browserify-app', 'browserify-vendor']);

gulp.task('browserify-app', function() {

  // App entry point
  return browserify('scripts/app.js', {
      insertGlobals: true,
      debug: true
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('www/js'));

});

gulp.task('browserify-vendor', function() {

  // Vendor entry point
  return browserify('scripts/vendor.js', {
      insertGlobals: true,
      debug: true
    })
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(gulp.dest('www/js'));

});
