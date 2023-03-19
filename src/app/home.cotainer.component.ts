import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Injectable, OnInit, Pipe, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { inspect } from '@xstate/inspect';
import { from, Observable } from 'rxjs';
import { actions, createMachine, interpret } from 'xstate';
import { query, todoRootStates } from './app.fsm';
import { TodosDB } from './model';
import { TodoDetailContainerComponent } from './todo-detail.container.component';
import { TodoListComponent } from './todo-list.component';

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
  imports: [
    TodoListComponent,
    TodoDetailContainerComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    RouterOutlet,
    SearchPipe,
    JsonPipe,
  ],
  standalone: true,
  selector: 'cpt-home',
  template: `
    <br />
    <label for="">next events:</label>
    <li *ngFor="let event of appService.state.nextEvents">{{ event }}</li>
    <br />
    <label for="">current state:</label>
    {{ appService.state.value | json }}
    <br />
    <br />
    <button title="new todo" (click)="appService.send({ type: 'onTodoNew' })">new todo</button>
    <br />
    <br />
    <input type="text" #search (input)="searchValue = search.value" /><button
      title="clear search"
      (click)="search.value = ''; searchValue = ''; search.focus()"
    >
      x
    </button>
    <ng-container *ngIf="(state$ | async).matches('RootContainer.Root.TodoList')">
      <cpt-todo-list
        [items]="(state$ | async).context.items | filter: 'title':searchValue"
        (onEdit)="appService.send({ type: 'onTodoDetail', item: $event })"
        (onChange)="onTodoStatusChange($event)"
        (onDelete)="onDelete($event)"
      ></cpt-todo-list>
    </ng-container>
    <ng-template *ngIf="(state$ | async).matches('RootContainer.Root.Empty')">
      <div>there are no todos add some.</div>
    </ng-template>
    <router-outlet></router-outlet>
    {{ state$ | async | json }}
  `,
})
export class HomeContainerComponent implements OnInit {
  @ViewChild('search')
  search!: TemplateRef<any>;

  searchValue = '';

  constructor(public router: Router) {}
  todos$: Observable<any[]> | null = null;
  state$: Observable<any> | null = null;
  error: string | null = null;
  appService: any = null;

  async onDelete(item: any) { 
    debugger;
    // this.store.dispatch(onTodoRemove({ item }));
  }

  ngOnInit(): void {
    const queryMachine = createMachine(query as any, { services: { query: TodosDB.getAll } });
    this.appService = interpret(
      createMachine(todoRootStates as any, {
        services: { query: queryMachine }, actions:{
          toRouterTodoDetail: (context,event,data) => {
            debugger
            this.router.navigateByUrl(['edit',])
            console.log(context,event,data)
          }
        },
        guards: { isEmpty: (context, event) => event['data'].length === 0 },
      }),
      { devTools: true }
    );
    inspect({
      // options
      // url: 'https://stately.ai/viz?inspect', // (default)
      iframe: false, // open in new window
    });
    this.appService
      .onTransition((state: any) => {
        console.log(state);
        debugger;
      })
      .start();
    this.state$ = from(this.appService);
    // debugger
    // this.service$ = from(this.appService.state.nextEvents)
    // this.store.dispatch(onTodoLoad());
  }

  async onTodoStatusChange(item: any) {
    // this.store.dispatch(onTodoUpdate({ item: { ...item, ...{ status: item.status === 'done' ? '' : 'done' } } }));
  }

  onEdit(item: any) {
    // this.router.navigate(['edit', item.id]);
  }
}
