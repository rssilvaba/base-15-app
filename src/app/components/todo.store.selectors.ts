import { getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { states, transitions } from './todo.fsm';

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  // selectRouteDataParam, // factory function to select a route data param
  selectUrl, // select the current url
  selectTitle, // select the title if available
} = getRouterSelectors();



export const initialState = {
  state: Object.entries(states).find(([state, value]) => value[1] === 'initial')?.[0] || 'Selector',
  context: { items: null, error: null, filter: '' },
};

export const featureSelector = createFeatureSelector<typeof initialState>('counter');
export const selectContext = createSelector(featureSelector, ({ state, context }: typeof initialState) => context);
export const selectTodoItems = createSelector(
  featureSelector,
  ({ state, context }: typeof initialState) => context.items
);
export const selectCan = createSelector(featureSelector, ({ state }: typeof initialState) =>
  Object.keys(transitions?.[state])
);
export const selectState = createSelector(featureSelector, ({ state, context }: typeof initialState) => state);
