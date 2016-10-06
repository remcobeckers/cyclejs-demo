import { Stream } from 'xstream';
import { div, label, input, hr, h2 } from '@cycle/dom';
import { ISources, ISinks } from './app';

export interface Page2Props {
  name: string;
}

export interface Page2Sources extends ISources {
  props$: Stream<Page2Props>;
}

export function Page2(sources: Page2Sources): ISinks {
  const props$ = sources.props$;

  const sinks: ISinks = {
    dom: props$.map(props =>
        div('#root', [
          h2(`A pre-configured name: ${props.name}`),
        ])
      ),
    router: Stream.empty()
  };
  return sinks;
}
