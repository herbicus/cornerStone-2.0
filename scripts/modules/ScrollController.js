'use strict'

var MobileCheck = require('./MobileCheck');
var SizeController = require('./SizeController');

// -----------------------------------------------	
// SCROLL CONTROLLER
// -----------------------------------------------	
// call in document.ready - ScrollController.init(); -
// - reference as such on app.js -
// var scrollController = require('./modules/ScrollController').ScrollController;
// var ScrollController = new scrollController();
// create new instance of ScrollController

var ScrollController = function () {

	this.init = function() {

		//dom elements
		//  section containers - use #sections-container
		this.sectionsContainer = $('body').find('#sections-container');
		// #home ( for above the fold/top hero) and general content use .content class name
		this.home = $('body').find('#home');
		// can change use for anyother section for dynamic content
		this.services = $('body').find('#someIdName');

		this.id = null;

		// check for mobile
		this.isMobile = MobileCheck.isMobile();

		this.scrollPos = 0;

		if(!this.isMobile){
			this.loop();
		}

	};

	this.move = function(){
		this.scrollPos = window.pageYOffset;
	};

	var scroll = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) };
	var currentY;
	var diff;
	var tweenedValue;
	var newY;
	var paToServ;
	var paToHome;

	this.loop = function() {

		this.parallax = SizeController.getSection();

		this.lastPos = this.scrollPos;
		currentY = this.currentY || 0;
		diff = -currentY - this.scrollPos;
		tweenedValue = diff / 14;
		newY = Math.round(currentY + tweenedValue);


		// section id name if want parallax
		if(this.parallax === 'someIdName'){

			paToServ = newY * -0.05;
			TweenMax.set(this.services, {css : { backgroundPosition : '50% ' + paToServ + '%' }});

		}

		// another section id name if want parallax
		if(this.parallax === 'anotherIdName'){

			paToHome = 0.5 + (newY * 0.08);
			TweenMax.set(this.home, {css : { yPercent : paToHome }});

		}

		this.sectionsContainer[0].style.webkitTransform = "matrix(1, 0, 0, 1, 0, " + newY + ")";
		this.sectionsContainer[0].style.transform = "matrix(1, 0, 0, 1, 0, " + newY + ")";

		this.currentY = currentY + tweenedValue;

		scroll(this.loop.bind(this));
	};

	this.jumpTo = function (id) {

		this.id = id;

		var offset = $(this.id).offset();

		// home id/top hero
		if(this.id === '#home'){
			this.parallax = 'home';
		}

		window.scrollTo(0, offset.top);

	}

}

exports.ScrollController = ScrollController;