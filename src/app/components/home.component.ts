import { Component } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-home',
  template: ` <button title="new todo">new todo</button>
    <br />
    <br />
    <input type="text" /><button title="clear search">x</button>`,
})
export class HomeComponent {
  // change() {
  //   this.store.dispatch({ type: 'onFilterChange', filter: 'a' });
  // }
  // onSelectorNone() {
  // this.store.dispatch(onSelectorDone({}));
  // }
  // DEC() {
  //   this.store.dispatch(DEC());
  // }
}
