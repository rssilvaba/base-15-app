import { Component, HostBinding } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'label[cpt-label]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class LabelComponent {
  @HostBinding('class')
  class = '';

  constructor() {
    // debugger
    this.class = `${this.class} Label`;
  }
}