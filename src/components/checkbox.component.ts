import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[cpt-checkbox-input]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class CheckboxInputComponent {
  @Input()
  @HostBinding('attr.checked')
  checked = null;

  @HostBinding('class')
  class = '';

  @HostBinding('attr.type')
  type = 'checkbox';

  constructor() {
    this.class = `absolute h-0 w-0 ${this.class} Input`;
  }
}
