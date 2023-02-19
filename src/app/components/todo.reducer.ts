import { createReducer, on } from '@ngrx/store';
import { canTransition, canTransitionIfGuarded } from './fsm.helper';
import { onQueryTodoDone, onQueryTodoFail } from './todo.actions';
import { guardedEvents, states } from './todo.fsm';
import { initialState } from './todo.store.selectors';

const can = canTransition(states)(guardedEvents);
const canIfGuarded = canTransitionIfGuarded(guardedEvents);

export const todoReducer = createReducer<typeof initialState>(
  initialState,
  on(onQueryTodoDone, ({ state, context }, data) => {
    const nextState = can({ state, context }, data);
    return nextState && canIfGuarded({ state, context }, data)
      ? {
          state: nextState,
          context: {
            ...context,
            items: data.items,
          },
        }
      : { state, context };
  }),
  on(onQueryTodoFail, ({ state, context }, data) => {
    const nextState = can({ state, context }, data);
    return nextState && canIfGuarded({ state, context }, data)
      ? {
          state: nextState,
          context: { ...context, error: data },
        }
      : { state, context };
  }),
);
