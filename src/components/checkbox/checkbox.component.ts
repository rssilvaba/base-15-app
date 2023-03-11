import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[cpt-checkbox]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class CheckboxInputComponent {
  @Input()
  checked = false;

  @HostBinding('attr.checked')
  get checked_() {
    return this.checked ? true : null;
  }

  @Input()
  class = '';

  @HostBinding('attr.type')
  type = 'checkbox';

  @Input()
  @HostBinding('indeterminate')
  @HostBinding('class.indeterminate')
  indeterminate = false;
  
  get indeterminate_() {
    // debugger;
    // this.class = this.class + 'indeterminate'
    return this.indeterminate ? true : null;
  }

  @HostBinding('attr.class')
  get class_() {
    return `absolute invisible h-0 w-0 ${this.class} Input`;
  }

  // ngOnInit(): void {
    // this.elementRef.nativeElement.indeterminate = this.indeterminate;
    // this.class = `${this.class} ${this.indeterminate?'indeterminate':''}`;
  // }
}
