"use strict";
var xstream_1 = require('xstream');
var dom_1 = require('@cycle/dom');
function Page1(sources) {
    var dom = sources.dom;
    var sinks = {
        dom: dom.select('#name').events('input')
            .map(function (ev) { return ev.target.value; })
            .startWith('')
            .map(function (name) {
            return dom_1.div([
                dom_1.div('.mdl-grid', [
                    dom_1.div('.mdl-cell.mdl-cell--3-col', [
                        dom_1.form({ attrs: { action: '#' } }, [
                            dom_1.div('.mdl-textfield mdl-js-textfield', [
                                dom_1.label('.mdl-textfield__label', { for: 'name' }, ['Say your name']),
                                dom_1.input('.mdl-textfield__input', { attrs: { id: 'name', type: 'text', value: name } }),
                            ])
                        ])
                    ])
                ]),
                dom_1.div('.mdl-grid', [
                    dom_1.div('.mdl-cell.mdl-cell--12-col', [
                        dom_1.hr(),
                        dom_1.h2(name ? "Hello, " + name + "!" : 'Hello! Please enter your name...'),
                    ])
                ])
            ]);
        }),
        router: xstream_1.Stream.empty()
    };
    return sinks;
}
exports.Page1 = Page1;
//# sourceMappingURL=Page1.js.map