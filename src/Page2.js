"use strict";
var dom_1 = require('@cycle/dom');
function Page2(sources) {
    var props$ = sources.props$;
    var sinks = {
        dom: props$.map(function (props) {
            return dom_1.div('#root', [
                dom_1.h1("A pre-configured name: " + props.name),
            ]);
        })
    };
    return sinks;
}
exports.Page2 = Page2;
//# sourceMappingURL=Page2.js.map