'use strict'

var MobileCheck = require('./MobileCheck');

// -----------------------------------------------	
// SLIDE CONTROLLER
// -----------------------------------------------	
// call in document.ready - SlideController.init(); -
// - reference as such on app.js -
// var slideController = require('./modules/SlideController').SlideController;
// var SlideController = new slideController();
// create new instance of SlideController

var SlideController = function () {

	this.init = function () {

		console.log(this);

		this.bullets = [];
		this.slides = [];
		this.heroImages = [];
		this.currentIndex = 0;
		this.oldIndex = 1;

		this.isMobile = MobileCheck.isMobile();

		
		this.slider = $('body').find('.slider');

		var self = this;

		//get the slides
		$('.slide').each(function(i) {
			self.slides[i] = this;
		});

		$('.bullets a').each(function(i){
			self.bullets[i] = this;
		});

		$('.slide-hero').each(function(i){
			self.heroImages[i] = this;
		});

		if(!this.isMobile){
			this.showSlide();
		}

	};

	this.next = function () {

		this.direction = 'slide-right';
		this.oldIndex = this.currentIndex;
		this.currentIndex < this.slides.length - 1 ? this.currentIndex++ : this.currentIndex = 0;

		this.showSlide();
	};

	this.prev = function () {

		this.direction = 'slide-left';
		this.oldIndex = this.currentIndex;
		this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex = this.slides.length - 1;

		this.showSlide();
	};

	this.jump = function (index) {

		this.direction = this.currentIndex < index ? 'slide-right' : 'slide-left';
		this.oldIndex = this.currentIndex;
		this.currentIndex = index;

		this.showSlide();
	};

	this.showSlide = function() {

		//hide all slides
		for(var i = 0; i < this.slides.length; i++){
			TweenMax.set( this.slides[i],  { xPercent: '-100%' });
			$(this.bullets[i]).removeClass('active');
		}

		$(this.bullets[this.currentIndex]).addClass('active');

		this.animate();

	};

	this.animate = function() {

		//set the direction
		var direction = this.direction === 'slide-right' ? -1 : 1;

		//set where the next slide is coming in
		TweenMax.set( this.slides[this.currentIndex], { xPercent: (direction < 0) ? '100%' : '-100%' });

		var tl = new TimelineMax ();
		var t2 = new TimelineMax ();

		tl.add ([
			TweenMax.to ( this.heroImages[this.currentIndex], 0.4, { opacity: 1, ease: Power2.easeIn })
		]);

		//animate in
		tl.add ([
			TweenMax.fromTo (this.slides[this.currentIndex], 0.2, { xPercent: (direction < 0) ? '100%' : '-100%' }, { xPercent: (direction < 0) ? '40%' : '-40%', ease: Power2.easeIn }),
			TweenMax.to (this.slides[this.currentIndex], 0.4, { xPercent: '0%', ease: Power4.easeOut })
		], 0.0, 'sequence');

		t2.add ([
			TweenMax.to ( this.heroImages[this.oldIndex], 0.4, { opacity: 0, ease: Power2.easeIn })
		]);

		//animate out
		t2.add ([

			TweenMax.fromTo (this.slides[this.oldIndex], 0.2, { xPercent: '0%' }, { xPercent: (direction < 0) ? '-40%' : '40%', ease: Power2.easeIn }),
			TweenMax.to (this.slides[this.oldIndex], 0.4, { xPercent: (direction < 0) ? '-100%' : '100%', ease: Power4.easeOut })
		], 0.0, 'sequence');

	}

}

exports.SlideController = SlideController;