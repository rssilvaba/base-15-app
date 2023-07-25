// Button.stories.ts

import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular/';

import {
  ButtonComponent,
  ButtonLinkComponent,
  ButtonInputComponent,
  buttonSizeVariantStyles,
  buttonDisabledStyles,
  ButtonArgTypes,
} from './button.component';
const meta: Meta<ButtonComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Buttons',
  component: ButtonComponent,
  argTypes: ButtonArgTypes,
  decorators: [
    componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`),
    // moduleMetadata({
    //   imports:[ButtonComponent, ButtonLinkComponent, ButtonInputComponent]
    // })
  ],
};

//👇 We create a “template” of how args map to rendering
// const Template: Story<ButtonComponent> = (args) => ({
//   props: args,
// });

type Story = StoryObj<ButtonComponent>;

//👇 Each story then reuses that template
export const Button: Story = {
  args: {
    disabled: false,
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

export default meta;
