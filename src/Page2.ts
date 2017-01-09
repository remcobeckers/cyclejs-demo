import { Stream } from 'xstream';
import { div, a, label, input, hr, h2, VNode } from '@cycle/dom';
import { DOMSource } from '@cycle/dom/xstream-typings';

export interface Page2Props {
  name: string;
}

export interface Page2Sources  {
  dom: DOMSource;
  props$: Stream<Page2Props>;
}

export interface Page2Sinks {
  dom: Stream<VNode>;
  router: Stream<string>;
}

export function Page2(sources: Page2Sources): Page2Sinks {
  const props$ = sources.props$;

  const goToHome$ = sources.dom.select('.homeLink').events('click').mapTo('/home');
  const view$ = props$
    .map(props =>
      div('#root', [
        h2(`A pre-configured name: ${props.name}`),
        a('.homeLink', { props: { href: '#'}}, [ 'Home' ])
      ])
    );

  return {
    dom: view$,
    router: goToHome$
  };
}
