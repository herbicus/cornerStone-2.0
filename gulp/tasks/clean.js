var gulp = require('gulp');
var del = require('del');


gulp.task('clean', function() {
	
	del(['./www/js/*.js', './www/css/*.css'], function (err) {});

});