'use strict';

var gulp = require('gulp'),
	express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    config = require('../config.js');


gulp.task('serve', function() {

	// Set up an express server (not starting it yet)
	var server = express()

	// Add live reload
	server.use(livereload({port: config.livereloadport}));

	// Use our 'dist' folder as rootfolder
	server.use(express.static('./www'));

	// Start webserver
	server.listen(config.serverport);

	// Start live reload
	refresh.listen(config.livereloadport);

});


