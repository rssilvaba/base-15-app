import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, firstValueFrom, take, takeLast } from 'rxjs';
import { MyDialogComponent } from './dialog.component';
import { onTodoInsert, onTodoUpdate, selectTodo } from './ngrx';
import { TodosDB, TodoService } from './todo.model.service';

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
  todo: { description: string; title: string; id?: number; status?: string } | null = null;

  @Output()
  onCancel = new EventEmitter();

  @Output()
  onSave = new EventEmitter();
}
