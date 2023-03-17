import { AsyncPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyDialogComponent } from './dialog.component';
import { onTodoInsert, onTodoUpdate, selectTodo } from './ngrx';
import { TodoDetailComponent } from './todo-detail.component';

@Component({
  standalone: true,

  // selector: 'cpt-todo-detail-container',
  template: `
    <my-dialog>
      <ng-container my-dialog-header>Details</ng-container>
      <ng-container my-dialog-body>
        <cpt-todo-detail [todo]="todo$ | async" (onSave)="onSave($event)" (onCancel)="router.navigate(['..'])">
        </cpt-todo-detail>
      </ng-container>
    </my-dialog>
  `,
  imports: [AsyncPipe, MyDialogComponent, TodoDetailComponent],
})
export class TodoDetailContainerComponent {
  @Input()
  todo$: Observable<{ description: string; title: string; id?: number; status?: string } | null> =
    this.store.select(selectTodo);

  @Output()
  itemAdded: any = null;

  constructor(public router: Router, public store: Store) {}

  onSave({ current, update }: any) {
    debugger;
    const item = { ...current, ...update, ...(current?.id ? { id: current?.id } : null) };
    if (current?.id) {
      debugger;
      this.store.dispatch(onTodoUpdate({ item }));
      // window.dispatchEvent(new CustomEvent('onTodoEdited', { detail: { key: TodosDB.set(item), item } }));
    } else {
      this.store.dispatch(onTodoInsert({ item }));
      // window.dispatchEvent(new CustomEvent('onTodoAdded', { detail: { key: TodosDB.set(item), item } }));
    }
    this.router.navigate(['..']);
  }
}
