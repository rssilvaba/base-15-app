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

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  service: any;
  state$: Observable<any> | undefined;
  // service$: Observable<any> | undefined;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {console.log(params);});
  this.activatedRoute.queryParams.subscribe(qParams => {console.log(qParams);});

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
          // return this.router.events.pipe(
          //   map(()=>this.activatedRoute),
          //   tap(console.log),
          //   switchMap(e=>{
          //     debugger
          //     e;
          //     return from(TodosDB.get(27))
          //   })
          // );

          return TodosDB.get(27);
          // let prom: any;
          // return this.activatedRoute.params.pipe(
          //   tap(console.log),
          //   map((p) => p['todoId']),
          //   exhaustMap((todoId) => {
          //     debugger;
          //     return from(TodosDB.get(parseInt(todoId)));
          //   })
            // withLatestFrom(this.activatedRoute.params),
            // tap(s=>{
            //   console.log(s)
            // }),
            // filter((e) => e instanceof NavigationEnd),
            // mergeMap(([e,a]) => {
            //   debugger;
            //   e;a;
            //   return from(TodosDB.get(parseInt(this.activatedRoute.snapshot.params?.['todoId'])));
            // })
          // );
          // return this.router.events.pipe(
          //   withLatestFrom(this.activatedRoute.params),
          //   // tap(s=>{
          //   //   console.log(s)
          //   // }),
          //   // filter((e) => e instanceof NavigationEnd),
          //   mergeMap(([e,a]) => {
          //     debugger;
          //     e;a;
          //     return from(TodosDB.get(parseInt(this.activatedRoute.snapshot.params?.['todoId'])));
          //   })
          // );
          // return await new Promise((res, rej) => {
          //   const sub = this.router.events.subscribe((e) => {
          //     // console.log('current route: ', this.router.url.toString());
          //     // e instanceof NavigationEnd
          //     debugger
          //     if (e instanceof ActivationEnd && e?.snapshot?.routeConfig?.path === ':todoId') {
          //       // prom = TodosDB.get(parseInt(e.snapshot.params['todoId']));
          //       sub.unsubscribe();
          //       // prom = TodosDB.get(parseInt(e.snapshot.params['todoId']));
          //       TodosDB.get(parseInt(e.snapshot.params['todoId'])).then(res).catch(rej)
          //     }
          //   });
          //   // const params = await firstValueFrom(this.activatedRoute.params);
          //   // const item = params?.['itemId'] ? await TodosDB.get(parseInt(params?.['itemId'])) : null;
          //   // if (this.router.url !== '/new') {
          //   //   alert('no item with that id, navigating back');
          //   //   this.router.navigate(['..']);
          //   // }
          //   // debugger;
          //   // return prom;
          //   // prom.then()
          //   // return TodosDB.get(parseInt(params?.['itemId']));
          // });
        },
      },
    });
    this.service = interpret(
      createMachine(todoRootStates as any, {
        services: {
          query: queryMachine,
          form: detailMachine,
          router: (context, event, data) => {
            debugger
            return Promise.resolve(event['item'] || null);
          },
        },
        actions: {
          // toRouterTodoDetail: (context, event, data) => {
          //   debugger;
          //   this.router.navigate(['edit', event['item'].id]);
          //   console.log(context, event, data);
          // },
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
