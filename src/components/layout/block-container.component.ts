import { Component, HostBinding, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[cpt-block]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class BlockContainerComponent {
  // @Input()
  // checked = false;

  // @HostBinding('attr.checked')
  // get checked_() {
  //   return this.checked ? true : null;
  // }

  @HostBinding('class')
  class = '';

  // @HostBinding('attr.type')
  // type = 'checkbox';

  // @Input()
  // @HostBinding('indeterminate')
  // indeterminate = false;

  // get indeterminate_() {
  //   // debugger;
  //   return this.indeterminate ? true : null;
  // }

  constructor() {
    // debugger
    this.class = `${this.class} BlockContainer`;
  }

  // ngOnInit(): void {
  //   this.elementRef.nativeElement.indeterminate = this.indeterminate;
  // }
}
