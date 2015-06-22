'use strict';

var gulp = require('gulp');

// default task
gulp.task('default', ['clean'], function () {
    gulp.start('dev');
});