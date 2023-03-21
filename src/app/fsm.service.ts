import { Injectable, NgModule } from '@angular/core';
import { createMachine, interpret, assign } from 'xstate';
import { inspect } from '@xstate/inspect';
import { firstValueFrom, from, Observable } from 'rxjs';
// import { todoMachine } from './app.fsm';
import { ActivatedRoute, Router } from '@angular/router';
import { formTodoDetailStates, query, todoRootStates } from './app.fsm';
import { TodosDB } from './model';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  service: any;
  state$: Observable<any> | undefined;
  service$: Observable<any> | undefined;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    const queryMachine = createMachine(query as any, { services: { query: TodosDB.getAll } });
    const detailMachine = createMachine(formTodoDetailStates as any, {
      services: {
        queryTodo: async () => {
          const params = await firstValueFrom(this.activatedRoute.params);
          // const item = params?.['itemId'] ? await TodosDB.get(parseInt(params?.['itemId'])) : null;
          // if (this.router.url !== '/new') {
          //   alert('no item with that id, navigating back');
          //   this.router.navigate(['..']);
          // }
          // debugger;
          
          return TodosDB.get(parseInt(params?.['itemId']));
        },
      },
    });
    this.service = interpret(
      createMachine(todoRootStates as any, {
        services: {
          query: queryMachine,
          form: detailMachine,
          router: (context, event, data) => {
            return Promise.resolve(event['item'] || null);
          },
        },
        actions: {
          toRouterTodoDetail: (context, event, data) => {
            debugger;
            this.router.navigate(['edit', event['item'].id]);
            console.log(context, event, data);
          },
        },
        guards: {
          isEmpty: (context, event) => event['data'].length === 0,
          isTodoNewRoute: () => this.router.url.includes('new'),
          isTodoDetailRoute: () => this.router.url.includes('edit'),
        },
      }),
      { devTools: true }
    );
    inspect({
      // options
      // url: 'https://stately.ai/viz?inspect', // (default)
      iframe: false, // open in new window
    });
    this.service
      .onTransition((state: any) => {
        console.log(state);
        debugger;
      })
      .start();
    this.state$ = from(this.service);
    // debugger
    // this.service$ = from(this.service.state.nextEvents)
    // this.store.dispatch(onTodoLoad());
  }

  ngOnDestroy() {
    this.service.stop();
  }
}
