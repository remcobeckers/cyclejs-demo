import { Stream } from 'xstream';
import { div, h, a, label, input, hr, h1, makeDOMDriver, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { run } from '@cycle/xstream-run';
import './style.css';
import '../node_modules/material-design-lite/material.min.css';
import { Page1 } from './Page1';
import { Page2, Page2Sources, Page2Props} from './Page2';
import {makeRouterDriver } from 'cyclic-router';
import { createHistory } from 'history';
import switchPath from 'switch-path';

export interface ISources {
  dom: DOMSource;
  router: any;
}

export interface ISinks {
  dom: Stream<VNode>;
  router: Stream<string>;
}

function main(sources: ISources): ISinks {
  const dom = sources.dom;

  const routes = {
    '/page2/:name' : name => sources => Page2({ props$: Stream.of( { name: name  }), dom: sources.dom, router: sources.router }),
    '/home': Page1,
    '*' : Page1
  };
  const match$ = sources.router.define(routes);

  const page$ = match$.map(({ path, value }) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path)
    }));
  });

  const homeClick$ = dom.select('.home').events('click');
  const page2Click$ = dom.select('.page2').events('click');

  const navClick = Stream.merge(
    homeClick$.mapTo('/home'),
    page2Click$.mapTo('/page2/demoName')
  );

  const tabView$ = page$.map(c => c.dom).flatten();
  const mainView$ = tabView$.map(page =>
    div([
        a('.home', { props:{ href : '#' }}, 'Home' ),
        a('.page2', { props: {href: '#' }}, 'Page 2' ),
        page
      ]
    )
  );

  return {
    dom: mainView$,
    router: navClick
  }
}

run(main, {
  dom: makeDOMDriver('#app'),
  router: makeRouterDriver(createHistory(window.location.href), switchPath)
})
