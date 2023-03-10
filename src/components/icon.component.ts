import { Component, HostBinding } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cpt-icon',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class IconComponent {
  @HostBinding('class')
  class = '';

  constructor() {
    // debugger
    this.class = `${this.class} Icon`;
  }
}