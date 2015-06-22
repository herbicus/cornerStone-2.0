'use strict';

var gulp = require('gulp'),
    config = require('../config.js'),
    refresh = require('gulp-livereload');

gulp.task('watch', ['lint', 'serve'], function() {

  // watch the scripts directory
  gulp.watch(['scripts/*.js', 'scripts/**/*.js'],[
    'browserify',
    'lint'
  ]);

  // watch the stylus directory
  gulp.watch(['styles/**/*.scss'], [
    'styles'
  ]);

  //report when the server has changed
  gulp.watch('./www/**/*').on('change', refresh.changed);

});