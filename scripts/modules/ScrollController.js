'use strict';

var $ = require('jquery');
var config = require('../config');
var AnimationController = require('./AnimationController');
var VideoController = require('./VideoController');

module.exports = function() {

  this.init = function() {

    //prepare the modules
    this.animate = new AnimationController();
    this.video = new VideoController();

    //probably move this to the bootstrap tomorrow.
    this.video.init();

    //gather the sections
    this.sections = $('section, #intel-footer');

    //add the listener
    this.listen();

    //for determing scroll direction
    this.lastScrollPos = 0;
    this.scrollDirection = null;

  };

  this.handler = function(e) {

    var scrollTop = $(window).scrollTop();

    if (scrollTop > this.lastScrollPos){
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }

    this.lastScrollPos = scrollTop;

    //if false, check to see when it changes then remove the listener
    this.sections.each(this.onVisibilityChange.bind(this));

  };

  this.listen = function() {

    //watch the scroll event, detect section changes
    $(window).on('resize scroll load', this.handler.bind(this));

  };

  this.onVisibilityChange = function(index, sectionEl) {

    var section = $(sectionEl);
    var isVisible = section.data('visible') === true;
    var detectVisible = this.detect(sectionEl) === true;

    if (detectVisible){

      //show
      if (!isVisible) {
        console.log(section);
        this.show(section);
      }

    } else {

      //hide
      if (isVisible) {
        this.hide(section);
      }

    }

  };

  this.detect = function(el) {

    if (el === undefined) {
      return;
    }


    var rect = el.getBoundingClientRect();

    var offset = el.clientHeight * 0.50;

    if(el === $('#intel-footer').get(0)){
      offset = el.clientHeight * 0.3;
    }

    var bottom = $(window).height();
    var top = 0;

    if(this.scrollDirection === 'down'){
      bottom = $(window).height() + offset;
      top = offset * -1;
    }else {
      top = offset * -1;
    }

    return (
      rect.top >= top &&
      rect.left >= 0 &&
      rect.bottom <= bottom &&
      rect.right <= $(window).width()
    );

  };

  this.show = function(section) {

    var isFooter = section.is('#intel-footer');
    var videos = section.find('video');

    if (videos.length) {

      this.video.playVideo(videos.get(0));

    } else {

      if (isFooter) {
        this.animate.animateInFooter(section);
      } else {
        this.animate.animateIn(section);
      }

    }

    section.data('visible', true);

  };

  this.hide = function(section){

    var videos = section.find('video');

    if (videos.length) {

      this.video.stopVideo(videos.get(0));
      section.data('visible', false);

    } else {

      //this.animate.animateOut(section);

    }

  };

};
