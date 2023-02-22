import { Component, OnDestroy, OnInit } from '@angular/core';
import { inspect } from '@xstate/inspect';
import { interpret } from 'xstate';
import { todoMachine } from './app.fsm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'base-15-app';
  appService: any;
  ngOnInit(): void {
    this.appService = interpret(todoMachine, { devTools: true });
    inspect({
      // options
      // url: 'https://stately.ai/viz?inspect', // (default)
      iframe: false, // open in new window
    });
    this.appService.start();
  }

  ngOnDestroy(): void {
    ('');
  }
}
