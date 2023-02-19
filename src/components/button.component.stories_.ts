// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent, ButtonInputComponent, ButtonLinkComponent } from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: ButtonComponent,
  // render: (args) => {
  //   const { label, ...props } = args;
  //   return {
  //     props,
  //     template: `
  //       <input cpt-checkbox-input id="test2" class="dwr" checked />
  //     `,
  //   };
  // },
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, ButtonLinkComponent, ButtonInputComponent],
    }),
    // With template
    // componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`),
    // With component which contains ng-content
    // componentWrapperDecorator(ButtonComponent),

  ],
} as Meta;

// const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
//   props: args,
// });

// const Primary = Template.bind({});
// Primary.args = {
//   label: 'Button',
//   size: 'small',
//   variant: 'primary',
// };

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
// export const Button = (args: ButtonComponent) => ({
//   template: `
//     <div class="p-2">
//       <button cpt-btn [size]="${args.size}" [variant]="${args.variant}">Primary Input Button</button>
//     </div>
//   `,
// });

// export const ButtonInput = (args: ButtonComponent) => ({
//   args,
//   template: `
//     <div class="p-2">
//       <input cpt-button-input value="Primary Input Button" />
//     </div>
//   `,
// });

export const Button: Story<ButtonComponent> = (args) => ({
  props: {
    size: 'large',
    variant: 'primary',
  },
  template: `
  <div class="p-2 flex flex-wrap gap-2">
    <button cpt-btn class="Aw" [size]="size" [variant]="variant">Primary Button</button>
    <a href="#" cpt-btn class="Aw" [size]="size" [variant]="variant">Primary Link Button</a>
    <input cpt-btn class="Aw" [size]="size" [variant]="variant" type="submit" label="Primary Input Button">
  </div>
  `,
});
