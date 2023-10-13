import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  standalone: true,
})
export class ClassDir {
  private defaultClass = '';
  constructor(defaultClass: string) {
    this.defaultClass = defaultClass;
  }

  // @HostBinding('attr.noClass')
  @Input('no-class')
  noClass: any;

  @Input()
  class? = '';

  @HostBinding('attr.class')
  get class_() {
    // debugger;
    return `${this.noClass === '' ? '' : this.defaultClass} ${this.class}`;
  }
}

@Component({
  selector: 'app-example',
  template: `
    <ng-content select="label"></ng-content>
    <ng-content select="select"></ng-content>
  `,
  styles: [
    `
      :host:empty:after {
        color: red;
        content: 'component did not receive the right children';
      }
    `,
  ],
  standalone: true,
  imports: [ClassDir],
})
export class ExampleComponent extends ClassDir implements OnInit {
  constructor() {
    super('DefaultClass');
  }

  ngOnInit(): void {
    debugger;
  }
}

const buttonDefaultStyles = 'min-w-[35px] border max-w-fit rounded';

const buttonActiveStyles = '[&:not(:disabled)]:active:shadow-inner2';
export const buttonDisabledStyles = {
  primary:
    'disabled:cursor-not-allowed  disabled:bg-[color:#999999] disabled:border-[color:#999999] disabled:text-white',
  secondary:
    'disabled:cursor-not-allowed  disabled:bg-white disabled:border-[color:#999999] disabled:text-[color:#999999]',
};
const buttonFocusStyles = '[&:not(:disabled)]:focus:ring-blur ring-[color:rgb(3,155,218,0.4)] focus:outline-none';

export const buttonSizeVariantStyles = {
  large: 'py-1.5 px-4',
  medium: 'py-1 px-3',
  small: 'py-0 px-2.5',
};

const buttonColorVariantStyles = {
  primary: 'bg-[color:#039BDA] text-white border-[color:#039BDA]',
  secondary: 'bg-white text-[color:#039BDA] border-[color:#039BDA]',
};

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[cpt-btn]',
  template: `
    <ng-container *ngIf="label">
      {{ label }}
    </ng-container>
    <ng-container *ngIf="!label">
      <ng-content></ng-content>
    </ng-container>
  `,
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ClassDir {
  constructor() {
    super(`Button ${buttonDefaultStyles} ${buttonActiveStyles} ${buttonFocusStyles}`);
    this.class =
      this.noClass === ''
        ? this.class
        : `${this.class} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
            buttonDisabledStyles[this.variant]
          }`;
  }

  // ngOnInit() {
  //   this.class =
  //     this.noClass === ''
  //       ? this.class
  //       : `${this.class} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
  //           buttonDisabledStyles[this.variant]
  //         }`;
  // }

  @Input()
  disabled: boolean | null = false;

  @HostBinding('attr.disabled')
  get disabled_() {
    return this.disabled ? '' : null;
  }

  @Input()
  label = '';

  @Input()
  size: keyof typeof buttonSizeVariantStyles = 'large';

  @Input()
  variant: keyof typeof buttonColorVariantStyles = 'primary';
}
