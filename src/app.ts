import { Stream } from 'xstream';
import { div, header, h, section, a, span, label, input, hr, h1, makeDOMDriver, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { run } from '@cycle/xstream-run';
import { Page1 } from './Page1';
import { Page2, Page2Sources, Page2Props} from './Page2';
import {makeRouterDriver } from 'cyclic-router';
import { createHistory } from 'history';
import switchPath from 'switch-path';
import '../node_modules/material-design-lite/material.min.css';
import '../node_modules/material-design-lite/material.min.js';

export interface ISources {
  dom: DOMSource;
  router: any;
}

export interface ISinks {
  dom: Stream<VNode>;
  router: Stream<string>;
}

function mainView(title: string, drawerTitle: string, tabContent: VNode) {
    return div('.mdl-layout.mdl-js-layout.mdl-layout--fixed-header.mdl-layout--fixed-tabs', [
      header('.mdl-layout__header', [
        div('.mdl-layout__header-row', [
          span('.mdl-layout-title', title)
        ]),
        div('.mdl-layout__tab-bar mdl-js-ripple-effect', [
          a('.mdl-layout__tab.is-active.home', { props: {href: '#fixed-tab-1'}}, "Home"),
          a('.mdl-layout__tab.page2', { props: {href: '#fixed-tab-2'}}, "Page 2"),
        ])
      ]),
      div('.mdl-layout__drawer', [
        span('.mdl-layout-title', [ drawerTitle ])
      ]),
      h('main.mdl-layout__content', [
        div('.page-content', [ tabContent ])
      ])
    ]
  );
}

function main(sources: ISources): ISinks {
  const dom = sources.dom;
  const routes = {
    '/page2/:name' : name => sources => Page2({ props$: Stream.of( { name: name  }), dom: sources.dom }),
    '/home': Page1,
    '*' : Page1
  };
  const match$ = sources.router.define(routes);

  const page$ = match$.map(({ path, value }) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }));
  });

  const homeClick$ = dom.select('a.home').events('click');
  const page2Click$ = dom.select('a.page2').events('click');

  const navClick: Stream<string> = Stream.merge(
    homeClick$.mapTo('/home'),
    page2Click$.mapTo('/page2/This is page 2')
  );

  const tabView$ = page$.map(c => c.dom).flatten();
  const mainView$: Stream<VNode> = tabView$.map(page =>
    mainView("Demo", "Demo drawer", page)
  );

  const pageRouting$: Stream<string> = page$.map(c =>
    !c.router ? Stream.empty() : c.router
  ).flatten();

  return {
    dom: mainView$,
    router: Stream.merge(navClick, pageRouting$)
  }
}

run(main, {
  dom: makeDOMDriver('#app'),
  router: makeRouterDriver(createHistory(window.location.href), switchPath)
})
