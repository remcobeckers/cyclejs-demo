"use strict";
var xstream_1 = require('xstream');
var dom_1 = require('@cycle/dom');
var xstream_run_1 = require('@cycle/xstream-run');
require('./style.css');
require('../node_modules/material-design-lite/material.min.css');
var Page1_1 = require('./Page1');
var Page2_1 = require('./Page2');
var cyclic_router_1 = require('cyclic-router');
var switch_path_1 = require('switch-path');
var history_1 = require('history');
function main(sources) {
    var dom = sources.dom;
    var page1 = Page1_1.Page1(sources);
    var page2Sources = {
        dom: dom,
        props$: xstream_1.Stream.of({ name: 'test' }),
    };
    var page2 = Page2_1.Page2(page2Sources);
    var view$ = xstream_1.Stream
        .combine(page1.dom, page2.dom)
        .map(function (children) { return dom_1.div(children); });
    return {
        dom: view$
    };
}
xstream_run_1.run(main, {
    dom: dom_1.makeDOMDriver('#app'),
    router: cyclic_router_1.makeRouterDriver(history_1.createHistory(), switch_path_1.switchPath)
});
//# sourceMappingURL=app.js.map