import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
  appService:any;
  state$:any;
  constructor (public appService_:MachineService) {
    this.appService = appService_.appService;
    this.state$ = appService_.state$;
  }
}
