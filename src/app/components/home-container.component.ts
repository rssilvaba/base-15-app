import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { inspect } from '@xstate/inspect';
import { from, Observable } from 'rxjs';
import { createMachine, interpret } from 'xstate';
import { listStates } from '../app.fsm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-home',
  template: `
    <button title="new todo" (click)="router.navigate(['new'])">new todo</button>
    <br />
    <br />
    <input type="text" /><button title="clear search">x</button>
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>status</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  `,
})
export class HomeContainerComponent {
  appService: any;
  items: any = null;

  state$: Observable<any> | undefined;
  service$: Observable<any> | undefined;
  constructor(public router: Router) {}
  // constructor() {
  //   this.appService = appService_.appService;
  // }

  // change() {
  //   this.store.dispatch({ type: 'onFilterChange', filter: 'a' });
  // }
  // onSelectorNone() {
  // this.store.dispatch(onSelectorDone({}));
  // }
  // DEC() {
  //   this.store.dispatch(DEC());
  // }
  ngOnInit(): void {
    this.appService = interpret(createMachine(listStates as any, {}), { devTools: true });
    inspect({
      // options
      // url: 'https://stately.ai/viz?inspect', // (default)
      iframe: false, // open in new window
    });
    this.appService.onTransition((state: any) => console.log(state)).start();
    this.state$ = from(this.appService);
    // debugger
    this.service$ = from(this.appService.state.nextEvents);
  }

  ngOnDestroy() {
    this.appService.stop();
  }
}
