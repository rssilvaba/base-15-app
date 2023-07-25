// import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import type { ArgTypes } from '@storybook/angular';

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
export class ButtonComponent {
  @Input()
  disabled: boolean | null = false;

  @HostBinding('attr.disabled')
  get disabled_() {
    return this.disabled ? '' : null;
  }

  @Input()
  label = '';

  @Input()
  class? = '';

  @HostBinding('attr.class')
  get class_() {
    // eslint-disable-next-line prettier/prettier
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${this.class} ${buttonActiveStyles} ${buttonDisabledStyles[this.variant]} ${buttonFocusStyles} Button`;
  }

  @Input()
  size: keyof typeof buttonSizeVariantStyles = 'large';

  @Input()
  variant: keyof typeof buttonColorVariantStyles = 'primary';
}
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[cpt-btn]',
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
export class ButtonLinkComponent {
  // @Input()
  // disabled: boolean | null = false;

  // @HostBinding('attr.disabled')
  // get disabled_() {
  //   return this.disabled ? '' : null;
  // }

  @Input()
  label = '';

  @Input()
  class = 'block';

  // @Input()
  // @HostBinding('attr.type')
  // get type__() {
  //   return 'button';
  // }

  @Input()
  size: keyof typeof buttonSizeVariantStyles = 'large';

  @HostBinding('attr.class')
  get class__() {
    // eslint-disable-next-line prettier/prettier
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${this.class} ${buttonActiveStyles} ${buttonDisabledStyles[this.variant]} ${buttonFocusStyles} Button`;
  }

  // @Input()
  // href: string | null = null;

  // @HostBinding('attr.href')
  // @Input()
  // get href__() {
  //   return this.disabled || this.href === '' ? null : this.href;
  // }

  @Input()
  variant: keyof typeof buttonColorVariantStyles = 'primary';
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input[cpt-btn]',
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
export class ButtonInputComponent {
  @Input()
  disabled: boolean | null = false;

  @HostBinding('attr.disabled')
  get disabled_() {
    return this.disabled ? '' : null;
  }

  @Input()
  @HostBinding('attr.value')
  label = '';

  @Input()
  class = 'block';

  /** @hidden */
  @HostBinding('attr.type')
  get type_() {
    return 'button';
  }

  /** @hidden */
  @HostBinding('attr.class')
  get class_() {
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
      this.class
    } ${buttonActiveStyles} ${buttonDisabledStyles[this.variant]} ${buttonFocusStyles} Button`;
  }

  @HostBinding('value')
  get value() {
    return this.label;
  }

  @Input()
  size: keyof typeof buttonSizeVariantStyles = 'large';

  @Input()
  variant: keyof typeof buttonColorVariantStyles = 'primary';
}

export const ButtonArgTypes: ArgTypes = {
  disabled: {
    options: [true, false],
    control: { type: 'boolean' },
  },
  variant: {
    description: 'the variant of the type of the button, default value is "primary"',
    options: Object.keys(buttonDisabledStyles),
    control: { type: 'radio' },
  },
  size: {
    defaultValue: Object.keys(buttonSizeVariantStyles)[0],
    description: 'the vertical size of the button, default value is "large"',
    options: Object.keys(buttonSizeVariantStyles),
    control: { type: 'radio' },
  },
};
