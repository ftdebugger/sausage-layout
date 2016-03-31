import {expect} from 'chai';

import {SausageLayout} from '../index';

describe('Sausage layout', function () {
    let layout;

    describe('resize', function () {
        beforeEach(function () {
            layout = new SausageLayout({
                minWidth: 100,
                maxWidth: 200,
                gutter: 10
            });
        });

        let cases = {
            '0 = 100': {
                container: 0,
                columns: 1,
                width: 100,

                nodes: [
                    {node: {height: 100}, out: {left: 0, top: 0, width: 100, height: 100}},
                    {node: {height: 100}, out: {left: 0, top: 110, width: 100, height: 100}}
                ]
            },
            '100 = 100': {
                container: 100,
                columns: 1,
                width: 100,

                nodes: []
            },
            '150 = 150': {
                container: 150,
                columns: 1,
                width: 150,

                nodes: []
            },
            '210 = 100 + (10) + 100': {
                container: 210,
                columns: 2,
                width: 100,

                nodes: [
                    {node: {height: 100}, out: {left: 0, top: 0, width: 100, height: 100}},
                    {node: {height: 100}, out: {left: 110, top: 0, width: 100, height: 100}},
                    {node: {height: 100}, out: {left: 0, top: 110, width: 100, height: 100}},
                    {node: {height: 100}, out: {left: 110, top: 110, width: 100, height: 100}}
                ]

            },
            '300 = 145 + (10) + 145': {
                container: 300,
                columns: 2,
                width: 145,

                nodes: [
                    {node: {height: 200}, out: {left: 0, top: 0, width: 145, height: 200}},
                    {node: {height: 100}, out: {left: 155, top: 0, width: 145, height: 100}},
                    {node: {height: 100}, out: {left: 155, top: 110, width: 145, height: 100}},
                    {node: {height: 100}, out: {left: 0, top: 210, width: 145, height: 100}}
                ]
            },
            '410 = 200 + (10) + 200': {
                container: 410,
                columns: 2,
                width: 200,

                nodes: [
                    {node: {width: 400, height: 100}, out: {left: 0, top: 0, width: 200, height: 50}},
                    {node: {width: 400, height: 100}, out: {left: 210, top: 0, width: 200, height: 50}},
                    {node: {width: 400, height: 100}, out: {left: 0, top: 60, width: 200, height: 50}}
                ]
            },
            '440 = 140 + (10) + 140 + (10) + 140': {
                container: 440,
                columns: 3,
                width: 140,

                nodes: []
            }
        };

        Object.keys(cases).forEach(caseName => {
            it(caseName, () => {
                let {container, columns, width, nodes} = cases[caseName];

                layout.resize(container);
                expect(layout.columns).to.equal(columns, 'columns');
                expect(layout.width).to.equal(width, 'width');

                nodes.forEach(({node, out}) => {
                    expect(layout.append(node)).to.eql(out, 'node position');
                });
            });
        });
    });

});
