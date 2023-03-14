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
    <ng-container *ngIf="(todos | async)?.todos?.length; else empty">
      <cpt-todo-list
        [items]="(todos | async)?.todos | filter: 'title':searchValue"
        (onEdit)="onEdit($event)"
        (onChange)="onTodoStatusChange($event)"
        (onDelete)="onDelete($event.id)"
      ></cpt-todo-list>
    </ng-container>
    <ng-template #empty>
      <div>there are no todos add some.</div>
    </ng-template>
    <router-outlet (deactivate)="wasItemAdded($event)"></router-outlet>
  `,
})
export class HomeContainerComponent implements OnInit {
  @ViewChild('search')
  search!: TemplateRef<any>;

  searchValue = '';

  constructor(public router: Router, public service: TodoService) {}
  todos: Promise<{ todos: null | any[]; error: null | string }> = TodosDB.getAll()
    .then((x) => Promise.resolve({ todos: x, error: null }))
    .catch((e) => {
      console.log(`we could not fetch the todos`);
      console.error(e);
      return Promise.resolve({ todos: null, error: 'we could not fetch the todos' });
    });

  // @HostListener('itemAdded')
  @HostListener('window:onTodoAdded', ['$event.detail'])
  async onTodoAdded(e: any) {
    const todos = await this.todos;
    if (e) {
      console.log('updating list with new added item', e);
      this.todos = Promise.resolve({ ...todos, todos: todos.todos?.concat(e) || todos.todos });
    }
  }

  @HostListener('window:onTodoEdited', ['$event.detail'])
  async onTodoEdited(e: any) {
    const todos = await this.todos;
    if (e) {
      console.log('updating list with edited item', e);
      this.todos = Promise.resolve({
        ...todos,
        todos: [...(todos.todos?.filter((x) => x.id !== e.id) || []), e] || todos.todos,
      });
    }
  }

  // @HostListener('itemAdded', ['$event'])
  // async onItemAddedInt(e: any) {
  //   debugger;
  //   console.log(e);
  // }

  async wasItemAdded(e: any) {
    // const todos = await this.todos;
    // if (e.itemAdded) {
    //   console.log('User Click using Host Listener', e.itemAdded);
    //   this.todos = Promise.resolve({ ...todos, todos: todos.todos?.concat(e.itemAdded) || todos.todos });
    // }
  }

  async onDelete(id: any) {
    debugger;
    try {
      await TodosDB.delete(id);
      const todos = await this.todos;
      if (todos.todos !== null) {
        debugger;
        this.todos = Promise.resolve({ todos: todos.todos.filter((x) => x.id !== id), error: todos.error });
      } else {
        this.todos = Promise.resolve(todos);
      }
      console.log(`item with id: ${id} was deleted`);
    } catch (error) {
      // console.log();
      console.error(`item with id: ${id} was not deleted, we got an error`,error);
    }
  }

  ngOnInit(): void {
    '';
    // console.log('rendered');
  }

  async onTodoStatusChange(item: any) {
    debugger;
    try {
      TodosDB.set({ ...item, ...{ status: item.status === 'done' ? '' : 'done' } });
      const todos = await this.todos;
      if (todos.todos !== null) {
        this.todos = Promise.resolve({
          todos: {
            ...todos.todos.map((x) =>
              x.id === item.id ? { ...item, status: item.status === 'done' ? '' : 'done' } : x
            ),
          },
          error: todos.error,
        });
      }
      console.log(`item with id: ${item.id} was changed status`);
    } catch (error) {
      console.error(`item with id: ${item.id} was not changed, we got an error`, error);
    }
  }

  onEdit(item: any) {
    this.router.navigate(['edit', item.id]);
  }
}
