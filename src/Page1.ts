import { Stream } from 'xstream';
import { div, form, label, input, hr, h2 } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { ISources, ISinks } from './app';

export function Page1(sources: ISources): ISinks {
  const dom = sources.dom;
  const sinks: ISinks = {
    dom: dom.select('#name').events('input')
      .map(ev => (ev.target as HTMLInputElement).value)
      .startWith('')
      .map(name =>
        div([
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--3-col', [
              form({ attrs: {action: '#'}}, [
                div('.mdl-textfield mdl-js-textfield', [
                  label('.mdl-textfield__label', { for: 'name' }, ['Say your name']),
                  input('.mdl-textfield__input', { attrs: { id: 'name', type: 'text', value: name } }),
                ])
              ])
            ])
          ]),
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--12-col', [
              hr(),
              h2(name ? `Hello, ${name}!` : 'Hello! Please enter your name...'),
            ])
          ])
        ])
      ),
    router: Stream.empty()
  };
  return sinks;
}
