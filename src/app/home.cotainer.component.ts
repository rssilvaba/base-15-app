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
import { TodoDetailComponent } from './todo-detail.container.component';
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
  imports: [TodoListComponent, TodoDetailComponent, AsyncPipe, NgIf, RouterOutlet, SearchPipe],
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
    <ng-container *ngIf="todos?.length; else empty">
      <cpt-todo-list
        [items]="todos | filter: 'title':searchValue"
        (onEdit)="onEdit($event)"
        (onChange)="onTodoStatusChange($event)"
        (onDelete)="onDelete($event.id)"
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

  constructor(public router: Router, public service: TodoService) {}
  todos: null | any[] = null;
  error: string | null = null;
  @HostListener('window:onTodoAdded', ['$event.detail'])
  async onTodoAdded(e: any) {
    e.key
      .then((key: any) => {
        console.log('updating list with new added item', e.item);
        this.todos = this.todos?.concat({ ...e.item, id: key }) || this.todos;
      })
      .catch((e: any) => {
        console.log(`item with name: ${e.item.name} was not added, we got an error`);
        console.error(e);
        this.error = e;
      });
  }

  @HostListener('window:onTodoEdited', ['$event.detail'])
  async onTodoEdited(e: any) {
    e.key
      .then((key: any) => {
        console.log('updating list with edited item', e.item);
        this.todos = [...(this.todos?.filter((x) => x.id !== key) || []), e.item] || this.todos;
      })
      .catch((e: any) => {
        console.log(`item with name: ${e.item.name} was not edited, we got an error`);
        console.error(e);
        this.error = e;
      });
  }

  async onDelete(id: any) {
    // debugger;
    try {
      await TodosDB.delete(id);
      // const todos = this.todos;
      if (this.todos !== null) {
        // debugger;
        this.todos = this.todos.filter((x) => x.id !== id);
      }
      console.log(`item with id: ${id} was deleted`);
    } catch (error: any) {
      // console.log();
      console.error(`item with id: ${id} was not deleted, we got an error`, error);
      this.error = error;
    }
  }

  ngOnInit(): void {
    ('');
    TodosDB.getAll()
      .then((x) => {
        this.todos = x;
      })
      .catch((e) => {
        console.log(`we could not fetch the todos`);
        console.error(e);
        this.error = e;
      });
  }

  async onTodoStatusChange(item: any) {
    // debugger;
    try {
      TodosDB.set({ ...item, ...{ status: item.status === 'done' ? '' : 'done' } });
      // const todos = await this.todos;
      if (this.todos !== null) {
        this.todos = this.todos.map((x) =>
          x.id === item.id ? { ...item, status: item.status === 'done' ? '' : 'done' } : x
        );
        console.log(`item with id: ${item.id} was changed status`);
      }
    } catch (error: any) {
      console.error(`item with id: ${item.id} was not changed, we got an error`, error);
      this.error = error;
    }
  }

  onEdit(item: any) {
    this.router.navigate(['edit', item.id]);
  }
}
