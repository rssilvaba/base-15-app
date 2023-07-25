// Button.stories.ts

import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular/';

import {
  ButtonComponent,
  ButtonLinkComponent,
  ButtonInputComponent,
  buttonDisabledStyles,
  buttonSizeVariantStyles,
  ButtonArgTypes,
} from './button.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Buttons',
  component: ButtonInputComponent,
  argTypes: ButtonArgTypes,
  decorators: [componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`)],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => ({
  props: args,
});

//👇 Each story then reuses that template
export const ButtonInput = Template.bind({});
ButtonInput.args = {
  variant: 'primary',
  label: 'Button',
  disabled: false,
};
// export const Button = (args: ButtonComponent) => ({
//     template: `
//       <input cpt-btn class="Aw" [size]="${args.size}" [variant]="${args.variant}" label="${args.label}">
//     `,
//   });
