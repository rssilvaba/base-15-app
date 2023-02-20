// import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

const buttonDefaultStyles = 'min-w-[35px] border max-w-fit rounded';

const buttonActiveStyles = '[&:not(:disabled)]:active:shadow-inner2';
const buttonDisabledStyles =
  'disabled:cursor-not-allowed disabled:bg-[color:#999999] disabled:border-[color:#999999] disabled:text-white';
const buttonFocusStyles = '[&:not(:disabled)]:focus:ring-blur ring-[color:rgb(3,155,218,0.4)] focus:outline-none';

const buttonSizeVariantStyles = {
  large: 'py-1.5 px-4',
  medium: 'py-1 px-3',
  small: 'py-0 px-2.5',
};

const buttonColorVariantStyles = {
  primary: 'bg-[color:#039BDA] text-white border-[color:#039BDA] ',
  secondary: 'bg-white text-[color:#039BDA] border-[color:#039BDA] ',
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
  disabled = null;

  @HostBinding('attr.disabled')
  get disabled_ () {
    return this.disabled ? true : null;
  }
  
  @Input()
  label = '';

  @Input()
  class? = '';

  @HostBinding('attr.class')
  get class_() {
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
      this.class
    } ${buttonActiveStyles} ${buttonDisabledStyles} ${buttonFocusStyles} Button`;
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
  @Input()
  label = '';

  @Input()
  class = 'block';

  @Input()
  @HostBinding('attr.type')
  type = 'button';

  @HostBinding('attr.class')
  get class__() {
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
      this.class
    } ${buttonActiveStyles} ${buttonDisabledStyles} ${buttonFocusStyles} Button`;
  }

  @Input()
  size: keyof typeof buttonSizeVariantStyles = 'large';

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
  disabled = null;

  @HostBinding('attr.disabled')
  get disabled_ () {
    return this.disabled ? true : null;
  }

  @Input()
  @HostBinding('attr.value')
  label = '';

  @Input()
  class = 'block';

  @Input()
  @HostBinding('attr.type')
  type = 'button';

  @HostBinding('attr.class')
  get class_() {
    return `${buttonDefaultStyles} ${buttonSizeVariantStyles[this.size]} ${buttonColorVariantStyles[this.variant]} ${
      this.class
    } ${buttonActiveStyles} ${buttonDisabledStyles} ${buttonFocusStyles} Button`;
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
