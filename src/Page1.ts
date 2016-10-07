import { Stream } from 'xstream';
import { h, div, form, label, input, hr, h2, VNode } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { ISources, ISinks } from './app';
import { InputText } from './components/InputText';
import '../node_modules/material-design-lite/material.min.css';
import '../node_modules/material-design-lite/material.min.js';

export function Page1(sources: ISources): ISinks {
  const dom = sources.dom;

  const nameInput = InputText({
    dom : dom,
    props$: Stream.of({
      label: 'Say your name',
      initialValue: ''
    })
  });

  const sinks: ISinks = {
    dom: Stream.combine(nameInput.dom, nameInput.value)
      .map(([nameDom, nameValue]) =>
        div([
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--3-col', [
              form({ attrs: {action: '#'}}, [
                nameDom
              ])
            ])
          ]),
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--12-col', [
              hr(),
              h2(nameValue ? `Hello, ${nameValue}!` : 'Hello! Please enter your name...'),
            ])
          ])
        ])
      ),
    router: Stream.empty()
  };
  return sinks;
}
