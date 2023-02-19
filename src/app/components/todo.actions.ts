import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { createAction, props } from '@ngrx/store';

export const onQueryTodoDone = createAction('onQueryTodoDone', props<{ items: any[] }>());
export const onQueryTodoFail = createAction('onQueryTodoFail', props<{ error: string }>());
export const onSelectorDone = createAction('onSelectorDone', props<{ state?: string }>());
export const onFilterChange = createAction('onFilterChange', props<{ fiter?: string }>());
export const onTodoDetail = createAction('onTodoDetail', props<{ item: { title: string; descrition: string } }>());
export const onTodoNew = createAction('onTodoNew');
export const onNavigation = createAction(ROUTER_NAVIGATION);
