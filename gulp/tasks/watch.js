'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('watch', ['styles', 'browserify'], function() {

    browserSync.init({
        server: "./www"
    });

    gulp.watch("styles/**/*.styl", ['styles']);
    gulp.watch("scripts/**/*.{js,hbs}", ['browserify']);

    gulp.watch("www/css/*.css").on('change', browserSync.reload);
    gulp.watch("www/*.html").on('change', browserSync.reload);
    gulp.watch("www/js/*.js").on('change', browserSync.reload);
});
