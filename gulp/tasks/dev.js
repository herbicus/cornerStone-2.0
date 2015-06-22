'use strict';

var gulp = require('gulp');

// dev task, fires up by default. 
gulp.task('dev', ['clean', 'lint', 'browserify', 'styles', 'watch'], function(){

});