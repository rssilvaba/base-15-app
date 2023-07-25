// Button.stories.ts

import { StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, Meta, moduleMetadata } from '@storybook/angular/';

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
  component: ButtonLinkComponent,
  argTypes: ButtonArgTypes,
  parameters: {
    controls: { exclude: 'disable' },
  },
  decorators: [componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`)],
} as Meta;

//👇 We create a “template” of how args map to rendering
type Story = StoryObj<ButtonLinkComponent>;

//👇 Each story then reuses that template
export const ButtonLink: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
  // parameters: {
  //   controls: { exclude: /^input*/ },
  // },
};
// export const Button = (args: ButtonComponent) => ({
//     template: `
//       <input cpt-btn class="Aw" [size]="${args.size}" [variant]="${args.variant}" label="${args.label}">
//     `,
//   });
