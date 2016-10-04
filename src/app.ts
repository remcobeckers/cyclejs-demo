import { Stream } from 'xstream';
import { div, label, input, hr, h1, makeDOMDriver, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';
import { run } from '@cycle/xstream-run';
import './style.css';
import '../node_modules/material-design-lite/material.min.css';
import { Page1 } from './Page1';
import { Page2, Page2Sources, Page2Props} from './Page2';
import {makeRouterDriver} from 'cyclic-router';
import { switchPath } from 'switch-path';
import { createHistory } from 'history';

export interface ISources {
  dom: DOMSource;
}

export interface ISinks {
  dom: Stream<VNode>;
}

function main(sources: ISources): ISinks {
  const dom = sources.dom;
  const page1 : ISinks = Page1(sources);
  const page2Sources = {
    dom : dom,
    props$ : Stream.of({ name: 'test'}),
  };
  const page2 : ISinks = Page2(page2Sources);
  const view$: Stream<VNode> = Stream
    .combine(page1.dom, page2.dom)
    .map(children => div(children));

  return {
    dom: view$
  }
}

run(main, {
  dom: makeDOMDriver('#app'),
  router: makeRouterDriver(createHistory(), switchPath)
})
