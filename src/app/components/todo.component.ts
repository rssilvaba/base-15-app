import { NgIf } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-todo',
  standalone: true,
  template: `
    <ng-container *ngIf="state.matches('Detail.Closing')">
      you progress will be gone...
      <button title="ok" (click)="onOk.emit()">ok</button>
      <button title="cancel" (click)="onCancel.emit()">cancel</button>
    </ng-container>
    <ng-container *ngIf="!state.matches('Detail.Closing')">
      <label for="">title:</label>
      <input type="text" />
      <label for="">description:</label>
      <input type="text" />
      <br />
      <br />
      <button title="save" (click)="onSave.emit({title:})>save</button>
      <button title="close" (click)="onClose.emit()">close</button>
    </ng-container>
  `,
  imports: [NgIf],
})
export class TodoComponent implements OnInit {
  @Input()
  state: any = null;

  @Input()
  item: any = null;

  @Output()
  onClose = new EventEmitter();

  @Output()
  onOk = new EventEmitter();

  @Output()
  onSave = new EventEmitter();

  @Output()
  onCancel = new EventEmitter();

  constructor() {
    ''
  }

  ngOnInit() {
    ''
  }
}
