import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MyDialogComponent } from './dialog.component';
import { TodosDB, TodoService } from './todo.model.service';

@Component({
  standalone: true,
  selector: 'cpt-todo-detail',
  template: `
    <my-dialog>
      <ng-container my-dialog-header>Details</ng-container>
      <ng-container my-dialog-body>
        <label for="">title:</label>
        <input type="text" #title [value]="item?.title" />
        <br />
        <label for="">description:</label>
        <input type="text" #description [value]="item?.description" />
        <br />
        <br />
        <button title="save" (click)="onSave({ title: title.value, description: description.value }, item)">
          save
        </button>
        <button title="cancel" (click)="router.navigate(['..'])">cancel</button>
      </ng-container>
    </my-dialog>
  `,
  imports: [AsyncPipe, MyDialogComponent],
})
export class TodoDetailComponent implements OnInit {
  @Input()
  item: { description: string; title: string; id?: number; status?: string } | null = null;

  @Output()
  itemAdded: any = null;

  constructor(public router: Router, public service: TodoService, private activatedRoute: ActivatedRoute) {}
  onSave(newValue: any, todo: any): void {
    // debugger;
    const newItem = { ...todo, ...newValue, ...(todo?.id ? { id: todo?.id } : null) };
    TodosDB.set(newItem)
      .then((key) => {
        debugger;
        if (todo?.id) {
          window.dispatchEvent(
            new CustomEvent('onTodoEdited', { detail: { ...newItem, ...(todo?.id ? { id: todo?.id } : { id: key }) } })
          );
        } else {
          window.dispatchEvent(
            new CustomEvent('onTodoAdded', { detail: { ...newItem, ...(todo?.id ? { id: todo?.id } : { id: key }) } })
          );
        }
        
        this.router.navigate(['..']);
      })
      .catch((e) => {
        console.log(`item with name: ${newItem.name} was not added, we got an error`);
        console.error(e);
      });
  }

  async ngOnInit() {
    const params = await firstValueFrom(this.activatedRoute.params);
    const item = params?.['itemId'] ? await TodosDB.get(parseInt(params?.['itemId'])) : null;
    if (item) {
      this.item = item;
    } else if (this.router.url !== '/new') {
      alert('no item with that id, navigating back');
      this.router.navigate(['..']);
    }
  }
}
