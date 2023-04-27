import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyDialogComponent } from './dialog.component';
import { todoT } from './ngrx';

@Component({
  standalone: true,
  selector: 'cpt-todo-detail',
  template: `
    <label for="">title:</label>
    <input type="text" #title [value]="todo?.title" />
    <br />
    <label for="">description:</label>
    <input type="text" #description [value]="todo?.description" />
    <br />
    <br />
    <button
      title="save"
      (click)="onSave.emit({ current: todo, update: { title: title.value, description: description.value } })"
    >
      save
    </button>
    <button title="cancel" (click)="onCancel.emit()">cancel</button>
  `,
  imports: [AsyncPipe, MyDialogComponent],
})
export class TodoDetailComponent {
  @Input()
  todo: todoT | undefined;

  @Output()
  onCancel = new EventEmitter();

  @Output()
  onSave = new EventEmitter();
}
