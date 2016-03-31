import {expect} from 'chai';
import cheerio from 'cheerio/lib/cheerio';

import {jQuerySausageLayout} from '../jquery';

describe('Sausage layout', function () {
    let layout, $container;

    describe('resize', function () {
        beforeEach(function () {
            $container = cheerio.load('<div id="wrapper">\n    <div data-width="100" data-height="200"></div>\n    <div data-width="100" data-height="100"></div>\n    <div data-width="100" data-height="300"></div>\n    <div data-width="100" data-height="100"></div>\n    <div data-width="100" data-height="100"></div>\n</div>')('#wrapper');
            /*
             200(1)  100(2)
             100(4)  300(3)
             100(5)
             */
            layout = new jQuerySausageLayout({
                minWidth: 100,
                maxWidth: 200,
                gutter: 10,
                $container
            });
        });

        it('can apply to container', function () {
            layout.resize(210);

            expect($container.css()).to.eql({
                height: '430px'
            });

            expect($container.find('div').eq(0).css()).to.eql({
                left: '0px',
                top: '0px',
                width: '100px',
                height: '200px'
            });

            expect($container.find('div').eq(1).css()).to.eql({
                left: '110px',
                top: '0px',
                width: '100px',
                height: '100px'
            });

        });
    });

});
