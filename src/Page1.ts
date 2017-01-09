import { Stream } from 'xstream';
import { h,  h3, div, form, label, input, hr, h2, VNode } from '@cycle/dom';
import { run } from '@cycle/xstream-run';
import { InputText, InputTextSinks } from './components/InputText';
import { DOMSource } from '@cycle/dom/xstream-typings';

interface Page1Source {
  dom: DOMSource
}
interface Page1Sinks {
  dom: Stream<VNode>
}

interface User {
  name: string;
  email: string;
}

interface State {
  user: User;
}

interface Actions {
  name$: Stream<string>;
  email$: Stream<string>;
}

function intent(nameInput: InputTextSinks, emailInput: InputTextSinks) {
  return {
    name$  : nameInput.value,
    email$ : emailInput.value
  };
}

function model(actions: Actions): Stream<State>{
  return Stream.combine(actions.name$, actions.email$)
    .map(([name, email]) => ({
      user: {
        name: name,
        email: email
      }
    })
  ).remember();
}

function view(state$: Stream<State>, nameView$: Stream<VNode>, emailView$: Stream<VNode>): Stream<VNode> {
  return Stream.combine(state$, nameView$, emailView$)
    .map(([state, nameView, emailView]) =>
      div([
        form({ attrs: {action: '#'}}, [
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--3-col', [
              nameView
            ])
          ]),
          div('.mdl-grid', [
            div('.mdl-cell.mdl-cell--3-col', [
              emailView
            ])
          ])
        ]),
        div('.mdl-grid', [
          div('.mdl-cell.mdl-cell--12-col', [
            hr(),
            h2(state.user.name ? `Hello, ${state.user.name}!` : 'Hello! Please enter your info...'),
            h3(state.user.email ? `Your e-mail is: ${state.user.email}` : '')
          ])
        ])
      ])
    );
}

export function Page1(sources: Page1Source): Page1Sinks {
  const dom = sources.dom;

  const nameInput = InputText({
    dom : dom,
    props$: Stream.of({
      label: 'Name',
      initialValue: ''
    })
  });
  const emailInput = InputText({
    dom : dom,
    props$: Stream.of({
      label: 'E-mail',
      initialValue: ''
    })
  });

  const state$ = model(intent(nameInput, emailInput));

   return {
    dom: view(state$, nameInput.dom, emailInput.dom)
  };
}
