'use strict';

var config = require('../config');

module.exports = function () {

    this.animateIn = function (elem) {

        if (config.mobile) {
            return;
        }

        var figure = elem.find('figure');
        var edge = elem.find('.edge');
        var headline = elem.find('h1');
        var copy = elem.find('p');
        var list = elem.find('ul');

        var tl = new TimelineMax({});

        TweenMax.set ([headline, copy, list], { force3D: true } );

        tl.to(edge, 1.2, {
            height: '100%',
            ease: 'Power2.easeInOut'
        });
        tl.staggerFrom([headline, copy, list], 2.0, {
            y: 80,
            autoAlpha: 1,
            ease: 'Power4.easeOut',

        }, 0.08, 0.2);
        tl.staggerFrom([headline, copy, list], 0.6, {
            autoAlpha: 0,
            ease: 'Power2.easeOut'
        }, 0.08, 0.2);
        tl.add([
            TweenMax.from(figure, 1.8, {
                x: -200,
                ease: 'Power4.easeOut'
            }),
            TweenMax.from(figure, 0.6, {
                autoAlpha: 0,
                ease: 'Power1.easeIn',
                delay: 0.2
            })
        ], 0.12);

    };

    this.animateInFooter = function (elem) {

        if (config.mobile) {
            return;
        }

        var tl = new TimelineMax ();

        tl.set ('#intel-footer > .content', {autoAlpha: 1});

        tl.staggerFrom ('.footer-header > h1, .footer-header > h2', 2.2, { y: 120, ease: Power4.easeOut }, 0.12 );
        tl.staggerFrom ('.footer-header > h1, .footer-header > h2', 0.6, { autoAlpha: 0, ease: Power1.easeOut }, 0.12, 0 );

        tl.from ('.footer-header > h1 > span', 2.2, { y: 120, ease: Power4.easeOut }, 0.08 );
        tl.from ('.footer-header > h1 > span', 0.6, { autoAlpha: 0, ease: Power1.easeOut }, 0.08 );

        var left = $('.two-col')[0];
        var right = $('.two-col')[1];

        tl.addLabel ('devices', 0.32);

        tl.from (left, 1.8, { x: -80, ease: Power4.easeOut }, 'devices' );
        tl.from (left, 1.8, { autoAlpha: 0, ease: Power1.easeOut }, 'devices' );

        tl.from (right, 1.8, { x: 80, ease: Power4.easeOut }, 'devices+=0.08' );
        tl.from (right, 1.8, { autoAlpha: 0, ease: Power1.easeOut }, 'devices+=0.08' );

    };

    this.animateOut = function (elem) {

        var figure = elem.find('.icon');
        var headline = elem.find('h1');
        var copy = elem.find('p');
        var list = elem.find('ul');
        var edge = elem.find('.edge');

        var tl = new TimelineMax();

        //TweenMax.to([figure, headline, copy, list, edge], 0.2, {autoAlpha: 0});

        console.log('animate out', elem);

    };

};
