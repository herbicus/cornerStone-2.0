'use strict';

console.log("app.js is loaded");

//scroll controller
var scrollController = require('./modules/ScrollController').ScrollController;
var ScrollController = new scrollController();

//size controller
var SizeController = require('./modules/SizeController');

//project slider
var slideController = require('./modules/SlideController').SlideController;
var SlideController = new slideController();

//mobile filter
var MobileCheck = require('./modules/MobileCheck');

$(document).ready(function() {

	ScrollController.init();
	SizeController.init();
	SlideController.init();

	console.log("can you hear me");

	var mobile = MobileCheck.isMobile();

	$('.arrow-left').click(function() {
		SlideController.prev();
	});

	$('.arrow-right').click(function() {
		SlideController.next();
	});

	var menuLinks = [];

	$('.bullets a').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault();
			if($(this)[0].className !== 'active'){
				SlideController.jump($(this).attr('href'));
			}
		});
	});

	$('#main-nav a').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault();
			ScrollController.jumpTo($(this).attr('href'));
		});
	});

	window.onscroll = function () {
		ScrollController.move();
		SizeController.move();
	};

	window.onresize = function () {
		SizeController.size();
		ScrollController.move();
		SizeController.move();
	};

});
