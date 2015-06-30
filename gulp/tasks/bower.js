'use strict';

var gulp = require('gulp');
var config = require('../config.js');
var gutil = require('gulp-util');
var concatsource = require('gulp-concat-sourcemap');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var bower = require('main-bower-files');
var concat = require('gulp-concat');

function buildBower() {

  var mainBowerFiles;

  try {
    mainBowerFiles = bower({debug: true, paths: '.', base: './bower_components'});
  } catch (error) {
    // bower_components folder does not exist, just print a warning and skip bower generation
    gutil.log(gutil.colors.red(error.message));
    return;
  }

  if (mainBowerFiles.length === 0) {
    gutil.log(gutil.colors.red('No bower components found, skipping bower.js generation'));
    return;
  }

  gutil.log(gutil.colors.yellow('Building: ' + mainBowerFiles.join('\n')));

  var task = gulp.src(mainBowerFiles)
    .on('error', function (error) {
      gutil.log('Bower error: ' + error);
    })
    .pipe(config.production ? concatsource('bower.js', {sourcesContent: true}) : concat('bower.js'))
    .pipe(config.production ? gutil.noop() : streamify(uglify()))
    .pipe(gulp.dest('./www/js'));


  return task;

}

gulp.task('bower', config.req, function () {

  return buildBower();

});
