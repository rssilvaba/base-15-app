import { AsyncPipe } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
          [todo]="
            appService.service.state.children['Todo.RootContainer.Root.TodoDetail:invocation[0]'].state.context.item
          "
          (onSave)="
            appService.service.state.children['Todo.RootContainer.Root.TodoDetail:invocation[0]'].send({
              type: 'onSave',
              item: $event
            })
          "
          (onCancel)="appService.service.send({ type: 'onClose' })"
        >
        </cpt-todo-detail>
      </ng-container>
    </my-dialog>
  `,
  imports: [AsyncPipe, MyDialogComponent, TodoDetailComponent],
})
export class TodoDetailContainerComponent {
  @Output()
  itemAdded: any = null;

  constructor(public router: Router, public appService: MachineService) {}
}
