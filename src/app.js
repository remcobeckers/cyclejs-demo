"use strict";
var xstream_1 = require('xstream');
var dom_1 = require('@cycle/dom');
var xstream_run_1 = require('@cycle/xstream-run');
var Page1_1 = require('./Page1');
var Page2_1 = require('./Page2');
var cyclic_router_1 = require('cyclic-router');
var history_1 = require('history');
var switch_path_1 = require('switch-path');
function mainView(title, drawerTitle, tabContent) {
    return dom_1.div('.mdl-layout.mdl-js-layout.mdl-layout--fixed-header.mdl-layout--fixed-tabs', [
        dom_1.header('.mdl-layout__header', [
            dom_1.div('.mdl-layout__header-row', [
                dom_1.span('.mdl-layout-title', title)
            ]),
            dom_1.div('.mdl-layout__tab-bar mdl-js-ripple-effect', [
                dom_1.a('.mdl-layout__tab.is-active.home', { props: { href: '#fixed-tab-1' } }, "Home"),
                dom_1.a('.mdl-layout__tab.page2', { props: { href: '#fixed-tab-2' } }, "Page 2"),
            ])
        ]),
        dom_1.div('.mdl-layout__drawer', [
            dom_1.span('.mdl-layout-title', [drawerTitle])
        ]),
        dom_1.h('main.mdl-layout__content', [
            dom_1.div('.page-content', [tabContent])
        ])
    ]);
}
function main(sources) {
    var dom = sources.dom;
    var routes = {
        '/page2/:name': function (name) { return function (sources) { return Page2_1.Page2({ props$: xstream_1.Stream.of({ name: name }), dom: sources.dom, router: sources.router }); }; },
        '/home': Page1_1.Page1,
        '*': Page1_1.Page1
    };
    var match$ = sources.router.define(routes);
    var page$ = match$.map(function (_a) {
        var path = _a.path, value = _a.value;
        return value(Object.assign({}, sources, {
            router: sources.router.path(path)
        }));
    });
    var homeClick$ = dom.select('.home').events('click');
    var page2Click$ = dom.select('.page2').events('click');
    var navClick = xstream_1.Stream.merge(homeClick$.mapTo('/home'), page2Click$.mapTo('/page2/demoName'));
    var tabView$ = page$.map(function (c) { return c.dom; }).flatten();
    var mainView$ = tabView$.map(function (page) {
        return mainView("Demo", "Demo drawer", page);
    });
    return {
        dom: mainView$,
        router: navClick
    };
}
xstream_run_1.run(main, {
    dom: dom_1.makeDOMDriver('#app'),
    router: cyclic_router_1.makeRouterDriver(history_1.createHistory(window.location.href), switch_path_1.default)
});
//# sourceMappingURL=app.js.map