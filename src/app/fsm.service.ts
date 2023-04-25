import { Injectable, NgModule } from '@angular/core';
import { createMachine, interpret, assign } from 'xstate';
import { inspect } from '@xstate/inspect';
import {
  exhaustMap,
  filter,
  first,
  firstValueFrom,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  scan,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
// import { todoMachine } from './app.fsm';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { formTodoDetailStates, query, todoRootStates } from './app.fsm';
import { TodosDB } from './model';
import { sendParent } from 'xstate/lib/actions';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  service: any;
  state$: Observable<any> | undefined;
  // service$: Observable<any> | undefined;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });
    this.activatedRoute.queryParams.subscribe((qParams) => {
      console.log(qParams);
    });

    // this.router.events.subscribe(e => {
    //   debugger
    //   console.log('current route: ', this.router.url.toString());
    //   // e instanceof NavigationEnd
    // });
    const queryMachine = createMachine(query as any, { services: { query: TodosDB.getAll } });
    const detailMachine = createMachine(formTodoDetailStates as any, {
      guards: {
        pristine: () => true,
      },
      services: {
        resolve: (c, e) => {
          return e['item'];
        },
      },
    });
    this.service = interpret(
      createMachine(todoRootStates as any, {
        services: {
          query: queryMachine,
          form: detailMachine,
          router: (context, event, data) => {
            debugger;
            if (event?.['data']?.todoId) {
              return TodosDB.get(event['data'].todoId);
            } else {
              return Promise.resolve(event['item'] || null);
            }
          },
        },
        actions: {
          toRouterTodoDetail: (context, event, data) => {
            debugger;
            this.router.navigate(['edit', event['item'].id]);
            console.log(context, event, data);
          },
          Close: (c, e) => {
            debugger;
            router.navigate(['..']);
            sendParent({ type: 'onClose' });
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
      .onTransition((state: any, ) => {
        console.log(state, state.value);
        // debugger;
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
