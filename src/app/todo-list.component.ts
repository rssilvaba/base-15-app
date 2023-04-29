import { NgClass, NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { todoT } from './ngrx';

@Component({
  standalone: true,
  selector: 'cpt-todo-list',
  template: `
    <table>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      <tr *ngFor="let item of items">
        <td>
          <input type="checkbox" [checked]="item?.status === 'done'" (change)="onChange.emit(item)" />
        </td>
        <td [ngClass]="item?.status === 'done' ? 'done' : ''">{{ item.title }}</td>
        <td [ngClass]="item?.status === 'done' ? 'done' : ''">{{ item.description }}</td>
        <td>
          <button title="edit" (click)="onEdit.emit(item)">e</button>
          <button title="delete" (click)="onDelete.emit(item)">x</button>
        </td>
      </tr>
    </table>
  `,
  imports: [NgClass, NgFor],
})
export class TodoListComponent {
  @Input()
  items: todoT[] | null = null;

  @Output()
  onDelete = new EventEmitter();
  
  @Output()
  onEdit = new EventEmitter();
  
  @Output()
  onChange = new EventEmitter();

  // constructor() {}
}
