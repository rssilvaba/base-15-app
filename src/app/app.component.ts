import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'xstate';
import { MachineService } from './fsm.service';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'base-15-app';
  appService: any;
  state$:any;
  onNewTodo() {
    console.log('onNewTodo')
  }
  // constructor (public appService_:MachineService) {
  constructor () {
    // this.appService = appService_.appService;
    // this.state$ = appService_.state$;
  }
  activate(e:any){
    // debugger
    if (e.constructor.toString().includes('TodoComponent')    ) {
      ''
    }
    console.log('activate',e)
  }
attach(e:any){
  console.log('attach',e)
}
deactivate(e:any){
  console.log('deactivate',e)
}
detach(e:any){
  console.log('detach',e)
}
}
