import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './home.cotainer.component';
import { TodoDetailComponent } from './todo-detail.container.component';

const routes: Routes = [
  {
    path: 'new',
    component: HomeContainerComponent,
    children: [
      {
        path: '',
        component: TodoDetailComponent,
      }
    ],
  },
  {
    path: 'edit',
    component: HomeContainerComponent,
    children: [
      {
        path: ':itemId',
        component: TodoDetailComponent,
      }
    ],
    // resolve: {    item: TodoResolver,  }
  },
  { path: '', component: HomeContainerComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
