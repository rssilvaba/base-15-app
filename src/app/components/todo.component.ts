import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-todo',
  template: `
    <label for="">title:</label>
    <input type="text" />
    <label for="">description:</label>
    <input type="text" />
    <br />
    <br />
    <button title="save">save</button>
    <button title="cancel" (click)="'d'">cancel</button>
  `,
})
export class TodoComponent implements OnInit {
  @Input()
  item: any = null;

  constructor() {}

  ngOnInit() {}
}
