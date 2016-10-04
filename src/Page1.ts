import { Stream } from 'xstream';
import { div, label, input, hr, h1 } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { ISources, ISinks } from './app';

export function Page1(sources: ISources): ISinks {
  const dom = sources.dom;
  const sinks: ISinks = {
    dom: dom.select('.field').events('input')
      .map(ev => (ev.target as HTMLInputElement).value)
      .startWith('')
      .map(name =>
        div('#root', [
          label('Say your name:'),
          input('.field', { attrs: { type: 'text', value: name } }),
          hr(),
          h1(name ? `Hello, ${name}!` : 'Hello! Please enter your name...'),
        ])
      )
  };
  return sinks;
}
