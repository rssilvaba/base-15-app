import { Injectable, NgModule } from '@angular/core';
import { createMachine, interpret, assign } from 'xstate';
import { inspect } from '@xstate/inspect';
import { from, Observable } from 'rxjs';
// import { todoMachine } from './app.fsm';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  appService: any;
  state$: Observable<any> | undefined;
  service$: Observable<any> | undefined;
  constructor(public router: Router) {
    // this.appService = interpret(todoMachine, { devTools: true });
    // inspect({
    //   // options
    //   // url: 'https://stately.ai/viz?inspect', // (default)
    //   iframe: false, // open in new window
    // });
    // this.appService.onTransition((state:any) => console.log(state)).start();
    // this.state$ = from(this.appService);
    // // debugger
    // this.service$ = from(this.appService.state.nextEvents)
  }
  ngOnDestroy() {
    this.appService.stop();
  }
}
