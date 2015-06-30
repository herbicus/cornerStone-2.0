'use strict'

var MobileCheck = require('./MobileCheck');

// -----------------------------------------------	
// SIZE CONTROLLER
// -----------------------------------------------	
// call in document.ready - SizeController.init(); -
// - reference as such on app.js -
// var SizeController = require('./modules/SizeController');

module.exports = {

	init: function() {

		this.section = [];
		this.footer = $('body').find('footer');

		var self = this;

		this.isMobile = MobileCheck.isMobile();

		//get our section list
		$('section').each(function(i) {
			self.section[i] = this;
		});

		this.section.push(this.footer);

		this.nav = $('body').find('#main-nav');
		this.links = this.nav.find('a');

		this.viewport = $('body').find('#viewport');
		this.sections = $('body').find('#sections');
		this.sectionsContainer = $('body').find('#sections-container');

		this.footer

		//set initial size
		this.size();

		this.active;

		//set initial view
		this.move();

	},

	size: function() {

		var contentHeight, windowHeight;

		this.sectionsContainer.css({ 'height' : '100%', 'position' : 'static' });

		windowHeight = $(window).height();

		var totalHeight = 0;

		for(var i = 0; i < this.section.length; i++){

			//get the height of the inner content, plus padding
			contentHeight = $(this.section[i]).find('.content').outerHeight();

			if(this.section[i] !== this.footer){
				//adjust to the window size or the height of the content
				if(contentHeight >= windowHeight){
					$(this.section[i]).css({ 'height' :  contentHeight });
					this.section[i].h = contentHeight;
				}else{
					$(this.section[i]).css({ 'height' :  windowHeight });
					this.section[i].h = windowHeight;
				}
			}

			if(this.section[i] === this.footer){
				this.section[i].h = $(this.section[i]).outerHeight();
			}

			totalHeight += this.section[i].h;

		}



		if(!this.isMobile){

			this.contentHeight = this.sectionsContainer.outerHeight();

			this.viewport.css({ 'height' : totalHeight});

			this.sections.css({ 'height' : '100%', 'position' : 'fixed'});

			this.sectionsContainer.css({ 'height' : '100%', 'width' : '100%', 'position' : 'fixed' });

			window.scrollTo(0, 0);

		}

		this.getOffsets();

	},

	getOffsets: function () {


		for(var i = 0; i < this.section.length; i++){

			this.section[i].h = $(this.section[i]).outerHeight();
			this.section[i].offset = $(this.section[i]).offset().top;

		}

	},

	inView: function() {

		if(this.scrollPos >= this.section[0].offset && this.scrollPos <= this.section[1].offset){
			this.home = true;
			this.activeSection = 'home';
			this.parallax = 'home';
		}

		if(this.scrollPos >= this.section[1].offset && this.scrollPos <= this.section[2].offset){
			this.home = false;
			this.activeSection = 'about';
			this.parallax = 'services';
		}

		if(this.scrollPos >= this.section[2].offset && this.scrollPos <= this.section[3].offset){
			this.home = false;
			this.activeSection = 'services';
			this.parallax = 'services';
		}

		if( this.scrollPos >= this.section[3].offset && this.scrollPos <= this.section[4].offset ){
			this.home = false;
			this.activeSection = 'work';
			this.parallax = '';
		}

		if( this.scrollPos >= this.section[4].offset && this.scrollPos <= this.section[5].offset ){
			this.home = false;
			this.activeSection = 'clients';
			this.parallax = '';
		}

		if( this.scrollPos >= (this.section[4].offset + this.section[5].h) ){
			this.home = false;
			this.activeSection = 'contact';
			this.parallax = '';
		}

		if(this.home === false){
			this.nav.addClass('active');
		}else{
			this.nav.removeClass('active');
		}

		this.setNav(this.activeSection);

	},

	setNav: function(activeSection){

		if(this.active !== activeSection){

			this.active = activeSection;

			var self = this;

			this.links.each(function() {

				var html = $(this)[0].text;
				html = html.toLowerCase();

				$(this).removeClass('active');

				if(html === self.active){
					$(this).addClass('active');
				}

			});

		}


	},

	getSection: function() {

		var section = this.parallax;

		return section;

	},

	move: function() {
		this.scrollPos = window.pageYOffset;
		this.inView();
	}

}