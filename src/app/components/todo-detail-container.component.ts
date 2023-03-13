import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AnyEventObject, createMachine, interpret, MachineConfig } from 'xstate';
import { formTodoDetailStates } from '../app.fsm';
import { TodoComponent } from './todo.component';
import { inspect } from '@xstate/inspect';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-todo-container',
  template: ` <app-todo [state]="state$ | async" (onClose)="this.appService.send({ type: 'onClose' })"></app-todo> `,
  standalone: true,
  imports: [TodoComponent, AsyncPipe],
})
export class TodoContainerComponent implements OnInit, OnDestroy {
  @Input()
  item: any = null;

  appService: any;
  state$: Observable<any> | undefined;
  service$: Observable<any> | undefined;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.appService = interpret(
      createMachine(formTodoDetailStates as any, {
        guards: {
          pristine: (context, event, machine) => {
            return machine.state.matches('Detail.Pristine');
          },
        },
        actions: {
          Close: (context, event, machine) => {
            debugger;
            this.router.navigate(['..']);
            return Promise.resolve();
          },
        },
      }),
      { devTools: true }
    );
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
