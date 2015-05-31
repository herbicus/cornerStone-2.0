'use strict';

var TweenMax = require('../vendor/TweenMax.min.js');

module.exports = function() {
	console.log("Animation started biyatches");

	var tl = new TimelineMax({paused: true});
	
	tl.to('.object', 0.75, { autoAlpha: 1, left: '50%', ease: Back.easeInOut});

	tl.play();

};