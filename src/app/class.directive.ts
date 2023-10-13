import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
})
export class ClassDirective {
  constructor(defaultClass: string) {
    this.defaultClass = defaultClass;
  }

  private defaultClass = '';

  @HostBinding('attr.noClass')
  noClass = null;

  @Input()
  class? = '';

  @HostBinding('attr.class')
  get class_() {
    return `${this.noClass ? '' : this.defaultClass} ${this.class}`;
  }
}
