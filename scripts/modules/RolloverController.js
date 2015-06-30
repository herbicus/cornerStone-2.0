'use strict';

var $ = require('jquery');
var config = require('../config');

var throttle = function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;

    return function () {
        var context = scope || this;
        var now = +new Date, args = arguments;

        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
};

var round = function(value, precision) {

    var factor = Math.pow(10, precision);

    return Math.round(value * factor) / factor;

};

module.exports = function() {

    this.init = function() {

        this.footer1 = $('.footer-img-left').get(0);
        this.footer2 = $('.footer-img-right').get(0);

        window.addEventListener('mousemove', throttle(this.mousemove, 100, this));

    };

    this.mousemove = function(e) {

        var rotateX = -1 / (window.innerHeight / 2) * e.clientY + 1;
        var rotateY = 1 / (window.innerWidth / 2) * e.clientX - 1;

        var transX = 20 * (1 / window.innerWidth * e.clientX) - 10;
        var transY = 20 * (1 / window.innerHeight * e.clientY) - 10;
        var transZ = 30 * (1 / window.innerHeight * e.clientY) - 15;

        //console.log({
        //    rotateX: round(rotateX, 2),
        //    rotateY: round(rotateY, 2),
        //    transX: round(transX, 2),
        //    transY: round(transY, 2),
        //    transZ: round(transZ, 2)
        //});

        var transform = 'perspective(1000px) ' +
            'translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) ' +
            'rotate3d(' + rotateX + ',' + rotateY + ',0,2deg)';

        //footer
        this.footer1.style.WebkitTransform = transform;
        this.footer2.style.WebkitTransform = transform;
        this.footer1.style.transform = transform;
        this.footer2.style.transform = transform;

    };

};
