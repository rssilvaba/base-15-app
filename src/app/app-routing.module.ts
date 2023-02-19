import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoHomeComponent } from './components/todo-home';

const routes: Routes = [
  {path: '', component: TodoHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
