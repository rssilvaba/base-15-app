import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Meta, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';
@Component({
  selector: 'adr-dummy',
  template: ` <button no-class cpt-btn class="Aw" [size]="'large'" [variant]="'secondary'" label="123">Click</button>`,
})
class DummyComponent {
  // (1)
  @Input()
  public size: 'small' | 'medium' | 'large' = 'medium';

  @Input()
  public outlined = false;

  @Input()
  public color?: 'primary' | 'accent' | 'warn';
}

export default {
  title: 'atoms/button',
  component: DummyComponent, // (2) don't forget it
} as Meta;

const Template: any = (args: any) => ({
  props: args,
  moduleMetadata: {
    // (3) don't forget it
    declarations: [],
    imports: [CommonModule, ButtonComponent],
  },
});

export const Default = Template.bind({});
Default.args = {};
