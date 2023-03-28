import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyDialogComponent } from './dialog.component';
import { MachineService } from './fsm.service';
import { TodoDetailComponent } from './todo-detail.component';

@Component({
  standalone: true,

  // selector: 'cpt-todo-detail-container',
  template: `
    <my-dialog>
      <ng-container my-dialog-header>Details</ng-container>
      <ng-container my-dialog-body>
        <cpt-todo-detail
          [todo]="(service | async)?.context.item"
          (onSave)="
            appService.service.send(
              {
                type: 'onSave',
                item: $event
              },
              { to: 'formTodoDetail' }
            )
          "
          (onCancel)="
            appService.service.send(
              {
                type: 'onClose'
              },
              { to: 'formTodoDetail' }
            )
          "
        >
        </cpt-todo-detail>
      </ng-container>
    </my-dialog>
  `,
  imports: [AsyncPipe, MyDialogComponent, TodoDetailComponent, JsonPipe],
})
export class TodoDetailContainerComponent implements OnInit {
  // @Input()
  service: Observable<any> = this.appService.service.state.children['formTodoDetail'];

  @Input()
  todoId = this.activatedRoute.snapshot.params['todoId'];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public appService: MachineService) {}

  ngOnInit(): void {
    // (window as any)['d'] = this.appService.service;
    // trigger this machine from the component?

    this.appService.service.send({ type: 'onRouteChange', data: { todoId: this.todoId } });
  }
}
