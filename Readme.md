Sausage layout
==============

Masonry layout for node.js

Install
-------

    npm install sausage-layout --save
    
Usage
-----

You can use only calculations and save results in way you prefer

```js

import {SausageLayout} from 'sausage-layout';

let layout = new SausageLayout({
    minWidth: 100,
    maxWidth: 200,
    gutter: 10
});

// calculate layout for 1024 screens
layout.resize(1024); 

// Return top and left position of element with height 400
let {top, left} = layout.append({height: 400}); 

// Return top and left position with ratio scale width 
// element to current grid width
let {top, left, width, height} = layout.append({width: 300, height: 400}); 

// when resize again - layout drop and you need to append elements again
layout.resize(960);

```

The second way is to use jQuery or cheerio

```js

import {jQuerySausageLayout} from 'sausage-layout/jquery';

let layout = new jQuerySausageLayout({
    minWidth: 100,
    maxWidth: 200,
    gutter: 10,
    $container: $('#container')
});

// calculate layout and set positions to elements
layout.resize(1024); 

```