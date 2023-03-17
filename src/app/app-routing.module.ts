import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './home.cotainer.component';
import { TodoDetailContainerComponent } from './todo-detail.container.component';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      {
        path: 'edit',
        children: [
          {
            path: ':todoId',
            component: TodoDetailContainerComponent,
          },
        ],
        // resolve: {    item: TodoResolver,  }
      },
      {
        path: 'new',
        children: [
          {
            path: '',
            component: TodoDetailContainerComponent,
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
