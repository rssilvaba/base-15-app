import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cpt-todo-list',
  template: ``,
})
export class TodoListComponent {
  @Input()
  items: any[] | null = null;

  constructor(private router: Router) {}

  onTodoDetail(itemTitle:any) {
    // console.log(e);
    this.router.navigate(['edit'], itemTitle);
  }
}
