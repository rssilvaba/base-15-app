import { Component, HostBinding, Input } from '@angular/core';

const Classes = 'inline-block [&>*]:min-w-[clamp(var(--min-width,0px),(var(--breakpoint)-100%)*999,100%-var(--gutter,0px))]';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[cpt-albatross]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class AlbatrossContainerComponent {
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
    this.class = `flex flex-wrap [--breakpoint:360px] ${this.class} AlbatrossContainer ${Classes}`;
  }

  // ngOnInit(): void {
  //   this.elementRef.nativeElement.indeterminate = this.indeterminate;
  // }
}
