import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  Injectable,
  OnInit,
  Pipe,
  PipeTransform,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onTodoLoad, onTodoRemove, onTodoUpdate, selectTodos } from './ngrx';
import { TodoDetailContainerComponent } from './todo-detail.container.component';
import { TodoListComponent } from './todo-list.component';
import { TodosDB, TodoService } from './todo.model.service';

@Pipe({
  name: 'filter',
  standalone: true,
})
@Injectable()
export class SearchPipe implements PipeTransform {
  transform(items: any[] | null = [], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter((singleItem) => singleItem[field].toLowerCase().includes(value.toLowerCase()));
  }
}
@Component({
  imports: [TodoListComponent, TodoDetailContainerComponent, AsyncPipe, NgIf, RouterOutlet, SearchPipe],
  standalone: true,
  selector: 'cpt-home',
  template: `
    <button title="new todo" (click)="router.navigate(['new'])">new todo</button>
    <br />
    <br />
    <input type="text" #search (input)="searchValue = search.value" /><button
      title="clear search"
      (click)="search.value = ''; searchValue = ''; search.focus()"
    >
      x
    </button>
    <ng-container *ngIf="(todos$ | async)?.length; else empty">
      <cpt-todo-list
        [items]="todos$ | async | filter: 'title':searchValue"
        (onEdit)="onEdit($event)"
        (onChange)="onTodoStatusChange($event)"
        (onDelete)="onDelete($event)"
      ></cpt-todo-list>
    </ng-container>
    <ng-template #empty>
      <div>there are no todos add some.</div>
    </ng-template>
    <router-outlet></router-outlet>
  `,
})
export class HomeContainerComponent implements OnInit {
  @ViewChild('search')
  search!: TemplateRef<any>;

  searchValue = '';

  constructor(public router: Router, public service: TodoService, public store: Store) {}
  todos$: Observable<any[]> = this.store.select(selectTodos);
  error: string | null = null;

  async onDelete(item: any) {
    debugger;
    this.store.dispatch(onTodoRemove({ item }));
  }

  ngOnInit(): void {
    this.store.dispatch(onTodoLoad());
  }

  async onTodoStatusChange(item: any) {
    this.store.dispatch(onTodoUpdate({ item: { ...item, ...{ status: item.status === 'done' ? '' : 'done' } } }));
  }

  onEdit(item: any) {
    this.router.navigate(['edit', item.id]);
  }
}
