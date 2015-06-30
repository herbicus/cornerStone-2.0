'use strict';

var TweenMax = require('../vendor/TweenMax.min.js');

function Animator(greeting) {
    this.greeting = greeting;//greeting;// = greeting || 'Hello, world!';

    TweenMax.to(this , 0.75, { left: "60%", color: "blue", ease: Back.easeInOut });

}

Animator.prototype.getGreeting = function () {
    return this.greeting;

    // TweenMax.to(this , 0.75, { left: "60%", color: "blue", ease: Back.easeInOut });
};

module.exports = Animator;

// var TweenMax = require('../vendor/TweenMax.min.js');

// function Animator(animateMe) {
    
//     this.animateMe = animateMe || "hello there";

// }

// Animator.prototype.getAnimation = function () {

// 	//TweenMax.to(this , 0.75, { left: "60%", color: "blue", ease: Back.easeInOut });
    
//     return this.animateMe;
// };

// module.exports = Animator;

// /**
//  * Animation Controller
//  * @constructor
//  */
// function AnimationController(){

//     // selectors

//     // initialize
//     this.init();

// }

// /**
//  * intialize function
//  */
// AnimationController.prototype.init = function() {

// 	console.log("animation loaded");
// 	$('h1').on('click', function(){
// 		TweenMax.to("h1" , 0.75, {
// 			left: "60%",
// 			autoAlpha: 0.75,
// 			ease: Back.easeInOut
// 		});
// 	})

// };

// /**
//  * start function
//  */
// // AnimationController.prototype.start = function() {

// //     console.log(':: banner animation started ::');

// // };

// module.exports = AnimationController;