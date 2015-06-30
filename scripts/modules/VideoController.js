'use strict';

var config = require('../config');

module.exports = function() {

    this.init = function() {

      if(config.mobile){

        this.videos = $('body').find('video');

        this.videos.each(function(i) {

          var video = this.videos[i];
          var sources = video.getElementsByTagName('source');

          var mp4 = sources[0].src;
          var webm =  sources[1].src;

          sources[0].src = webm;
          sources[0].type = 'video/webm';
          sources[1].src = mp4;
          sources[1].type = '';

          video.addEventListener('click', this.toggleVideoState.bind(video));

        }.bind(this));

      };


    }

    this.playVideo = function(video) {

      //pause any other videos
      var videos = $('body').find('video');
      videos.each(function(i) {
        if(!videos[i].paused){
          videos[i].pause();
        }
      });

      //play the new video
      if (!config.mobile) {
        video.play();
      }

    }

    this.stopVideo = function(video) {

        video.pause();

    },

    this.toggleVideoState = function(video){
      this.play();
    }

};
