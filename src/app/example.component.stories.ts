// Button.stories.ts

import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular/';

import { ButtonComponent, ButtonArgTypes } from './button.component';
import { ExampleComponent } from './example.component';

const meta: Meta<ButtonComponent> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Adb',
  component: ExampleComponent,
  argTypes: ButtonArgTypes,
  decorators: [
    componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule],
      // declarations: [ClassDirective],
    }),
  ],
};

//👇 We create a “template” of how args map to rendering
// const Template: Story<ButtonComponent> = (args) => ({
//   props: args,
// });

type Story = StoryObj<ButtonComponent>;

//👇 Each story then reuses that template
// export const Button: Story = {
//   args: {
//     disabled: false,
//     variant: 'primary',
//     label: 'Button',
//   },
//   // parameters: {
//   //   controls: { exclude: /^input*/ },
//   // },
// };

export const Adb2 = (args: ButtonComponent) => ({
  template: `
  <h1>Hello from {{ name }}!</h1>
  <a target="_blank" href="https://angular.io/start">
    Learn more about Angular
  </a>
  <br>
  <app-example>
    <label>Test</label>
    <select>
      <option>1</option>
    </select>
  </app-example>
  <br>
  <app-example no-class class="a"></app-example>
  <br>
    `,
});

export default meta;
