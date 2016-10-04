"use strict";
var dom_1 = require('@cycle/dom');
function Page1(sources) {
    var dom = sources.dom;
    var sinks = {
        dom: dom.select('.field').events('input')
            .map(function (ev) { return ev.target.value; })
            .startWith('')
            .map(function (name) {
            return dom_1.div('#root', [
                dom_1.label('Say your name:'),
                dom_1.input('.field', { attrs: { type: 'text', value: name } }),
                dom_1.hr(),
                dom_1.h1(name ? "Hello, " + name + "!" : 'Hello! Please enter your name...'),
            ]);
        })
    };
    return sinks;
}
exports.Page1 = Page1;
//# sourceMappingURL=Page1.js.map