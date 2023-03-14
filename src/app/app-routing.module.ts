import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './home.cotainer.component';
import { TodoDetailComponent } from './todo-detail.container.component';

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      {
        path: 'edit',
        children: [
          {
            path: ':itemId',
            component: TodoDetailComponent,
          },
        ],
        // resolve: {    item: TodoResolver,  }
      },
      {
        path: 'new',
        children: [
          {
            path: '',
            component: TodoDetailComponent,
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
