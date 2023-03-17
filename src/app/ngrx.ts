/* eslint-disable no-duplicate-imports */
import { createAction, createReducer, on, props } from '@ngrx/store';

type todoT = {
  title: string;
  description: string;
  id?: number;
  status?: string;
};

//#region ACTIONS
export const onTodoLoad = createAction('[Home Container] onTodoLoad');
export const onTodoLoadOk = createAction('[Home Container] onTodoLoadOk', props<{ todos: todoT[] }>());
export const onTodoLoadFail = createAction('[Home Container] onTodoLoadFail', props<{ error: string }>());
export const onTodoEdit = createAction('[Home Container] onTodoEdit', props<{ item: todoT }>());
export const onTodoNew = createAction('[Home Container] onTodoNew');
export const onTodoInsert = createAction('[Todo Detail] onTodoInsert', props<{ item: todoT }>());
export const onTodoInsertOk = createAction('[Todo Detail Container] onTodoInsertOk', props<{ item: todoT }>());
export const onTodoInsertFail = createAction('[Todo Detail Container] onTodoInsertFail', props<{ error: string }>());
export const onTodoUpdate = createAction('[Todo Detail] onTodoUpdate', props<{ item: todoT }>());
export const onTodoUpdateOk = createAction('[Todo Detail Container] onTodoUpdateOk', props<{ item: todoT }>());
export const onTodoUpdateFail = createAction('[Todo Detail Container] onTodoUpdateFail', props<{ error: string }>());
export const onTodoRemove = createAction('[Todo Detail] onTodoRemove', props<{ item: todoT }>());
export const onTodoRemoveOk = createAction('[Todo Detail Container] onTodoRemoveOk', props<{ item: todoT }>());
export const onTodoRemoveFail = createAction('[Todo Detail Container] onTodoRemoveFail', props<{ error: string }>());
//#endregion ACTIONS

//#region REDUCER
export const initialState: { todos: todoT[] | undefined } = { todos: undefined };

export const TodosReducer = createReducer(
  initialState,
  // onTodoLoadOk(({ todos } ) => (state: { todos }))
  on(onTodoLoadOk, (state, { todos }) => {
    debugger;
    return {
      todos,
    };
  }),
  on(onTodoInsertOk, (state, { item }) => {
    debugger;
    return {
      todos: state.todos?.concat(item),
    };
  }),
  on(onTodoUpdateOk, (state, { item }) => {
    debugger;
    return {
      todos: state.todos?.map((t) => (t.id === item.id ? item : t)),
    };
  }),
  on(onTodoRemoveOk, (state, { item }) => {
    debugger;
    return {
      todos: state.todos?.filter((t) => t.id !== item.id),
    };
  })
  // on(onTodoLoad, (state) => state + 1),
);
//#endregion REDUCER

//#region EFFECTS
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TodosDB } from './todo.model.service';

@Injectable()
export class TodosEffects {
  todoLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onTodoLoad),
      exhaustMap(() =>
        from(TodosDB.getAll()).pipe(
          map((todos) => {
            debugger;
            return onTodoLoadOk({ todos });
          }),
          catchError((error) => of(onTodoLoadFail({ error })))
        )
      )
    )
  );

  todoInsert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onTodoInsert),
      exhaustMap(({ type, item }) => {
        debugger;
        return from(TodosDB.set(item)).pipe(
          map((key) => {
            debugger;
            return onTodoInsertOk({ item: { ...item, id: key as number } });
          }),
          catchError((error) => of(onTodoInsertFail({ error })))
        );
      })
    )
  );

  todoRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(onTodoRemove),
      exhaustMap(({ type, item }) => {
        debugger;
        return from(TodosDB.delete(item.id as any)).pipe(
          map(() => {
            debugger;
            return onTodoRemoveOk({ item });
          }),
          catchError((error) => of(onTodoRemoveFail({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions) {}
}

//#endregion EFFECTS

//#region SELECTORS
import { createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();

export const selectFeature = (state: any) => state.todoState;

export const selectTodos = createSelector(selectFeature, (state: any) => {
  debugger;
  return state?.todos;
});
export const selectTodo = createSelector(selectTodos, selectRouteParams, (todos, { todoId }) => {
  debugger;
  return todos?.find((x: any) => x.id === parseInt(todoId, 10));
});

//#endregion SELECTORS
