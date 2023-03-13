import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainerComponent } from './components/home-container.component';
import { TodoContainerComponent } from './components/todo-detail-container.component';

export const routes: Routes = [
  { path: 'new', component: TodoContainerComponent },
  { path: 'edit/:itemTitle', component: TodoContainerComponent },
  { path: '', component: HomeContainerComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  // appService: any;
  // state$: Observable<any> | undefined;
  // service$: Observable<any> | undefined;
  // ngOnInit(): void {
  //   this.appService = interpret(todoMachine, { devTools: true });
  //   inspect({
  //     // options
  //     // url: 'https://stately.ai/viz?inspect', // (default)
  //     iframe: false, // open in new window
  //   });
  //   this.appService.onTransition((state:any) => console.log(state)).start();
  //   this.state$ = from(this.appService);
  //   // debugger
  //   this.service$ = from(this.appService.state.nextEvents)
  // }

  // ngOnDestroy(): void {
  //   ('');
  //   this.appService.stop();
  // }
}
