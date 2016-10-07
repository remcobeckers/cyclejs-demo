import { Stream } from 'xstream';
import { h, div, form, label, input, hr, h2, VNode } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { DOMSource } from '@cycle/dom/xstream-typings';
import isolate from '@cycle/isolate';

export interface InputTextProps {
  label : string;
  intialValue: string;
}

export interface InputTextSources {
  dom: DOMSource;
  props$: Stream<InputTextProps>;
}

export interface InputTextSinks {
  dom: Stream<VNode>;
  value: Stream<string>;
}

interface State {
  value: string;
  label: string;
}

function intent(domSource: DOMSource) {
  const value$ = domSource.select('.mdl-textfield__input').events('input')
    .map(ev => (ev.target as HTMLInputElement).value)

   return {
     value: value$
   }
}

function model(props$: Stream<InputTextProps>, actions: {value: Stream<string>}): Stream<State> {
  return props$.map(props =>
    actions.value
      .startWith(props.intialValue)
      .map(value => { return ({
          label: props.label,
          value: value
        });
      }
    )
  ).flatten().remember();
}

function view(state$: Stream<State>) {
  return state$.map(state =>
    h('div.mdl-textfield mdl-js-textfield',
    {
      hook: {
        insert: (vnode: VNode) => componentHandler.upgradeElement(<HTMLElement>vnode.elm)
      }
    },
    [
      label('.mdl-textfield__label', { for: 'name' }, [state.label]),
      input('.mdl-textfield__input', { attrs: { id: 'name', type: 'text', value: state.value } }),
    ])
  );
}

function InputTextImpl(sources: InputTextSources): InputTextSinks {
  const state$ = model(sources.props$, intent(sources.dom));
  return {
    dom: view(state$),
    value: state$.map(s => s.value)
  };
}

export const InputText = sources => isolate(InputTextImpl)(sources);
