import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TodoDetailComponent } from './todo-detail.container.component';
import { TodoListComponent } from './todo-list.component';

import { TodosDB, TodoService } from './todo.model.service';

@Component({
  imports: [TodoListComponent, TodoDetailComponent, AsyncPipe, NgIf, RouterOutlet],
  standalone: true,
  selector: 'cpt-home',
  template: `
    <button title="new todo" (click)="router.navigate(['new'])">new todo</button>
    <br />
    <br />
    <input type="text" /><button title="clear search">x</button>
    <ng-container *ngIf="(todos | async)?.length; else empty">
      <cpt-todo-list
        [items]="todos | async"
        (onEdit)="onEdit($event)"
        (onChange)="onChange($event)"
        (onDelete)="onDelete($event.id)"
      ></cpt-todo-list>
    </ng-container>
    <ng-template #empty>
      <div>there are no todos add some.</div>
    </ng-template>
    <router-outlet></router-outlet>
  `,
})
export class HomeContainerComponent {
  constructor(public router: Router, public service: TodoService) {}
  todos = TodosDB.getAll();
  async onDelete(id: any) {
    await TodosDB.delete(id);
    this.todos = TodosDB.getAll();
  }

  onChange(item: any) {
    TodosDB.set({ ...item, ...{ status: item.status === 'done' ? '' : 'done' } });
  }

  onEdit(item: any) {
    this.router.navigate(['edit', item.id]);
  }
}
