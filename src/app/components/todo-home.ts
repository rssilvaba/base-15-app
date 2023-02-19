import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCan, selectContext, selectState, selectTodoItems } from './todo.store.selectors';

@Component({
  selector: 'cpt-todo-home',
  template: `
    <button title="new todo" (click)="this.store.dispatch({ type: 'onNewTodo' })">new todo</button>
    <br />
    <br />
    <!-- <input type="text" (input)="onFilterChange($event)" [value]="(context$ | async)?.filter" />
    <button
      title="clear search"
      (click)="onFilterChange('')"
    >
      x
    </button> -->
    <cpt-todo-list *ngIf="(state$ | async) === 'TodoList'" [items]="items$ | async"></cpt-todo-list>
  `,
})
export class TodoHomeComponent {
  items$ = this.store.select(selectTodoItems);
  can$ = this.store.select(selectCan);
  context$ = this.store.select(selectContext);
  state$ = this.store.select(selectState);
  constructor(public store: Store) {}
}
