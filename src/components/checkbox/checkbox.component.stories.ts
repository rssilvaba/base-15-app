// Button.stories.ts

import { componentWrapperDecorator, Meta, Story } from '@storybook/angular/';
import { CheckboxInputComponent } from './checkbox.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Checkbox',
  component: CheckboxInputComponent,
  argTypes: {
    indeterminate: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
  decorators: [componentWrapperDecorator((story) => `<div class="p-2">${story}</div>`)],
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => ({
  props: args,
});

//👇 Each story then reuses that template
export const Indeterminate = Template.bind({});
Indeterminate.args = {
  checked: true,
  indeterminate: true,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'test',
};

export const Default = Template.bind({});
Default.args = {};

export const Test2: Story<CheckboxInputComponent> = (args: any) => ({
  props: args,
  template: `
  <input cpt-checkbox [checked]="${args.checked}" />
  This is a template test.`,
});
export const CustomIcon: Story<CheckboxInputComponent> = (args: any) => ({
  props: args,
  template: /* HTML */ `
    <input cpt-checkbox [checked]="${args.checked}" id="check1" class="[&:checked~label>svg]:fill-black" />
    <label for="check1" class="inline-block h-4 w-4 border border-black align-middle">
      <svg
        class="fill-transparent stroke-black"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="BookmarkBorderIcon"
      >
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
      </svg>
    </label>
    <label for="check1" class="align-middle ml-1">Label</label>
  `,
});
export const CustomIcon2: Story<CheckboxInputComponent> = (args: any) => ({
  props: args,
  template: /* HTML */ `
    <input cpt-checkbox [checked]="${args.checked}" id="check1" class="[&:checked~label>svg]:fill-black" />
    <label for="check1" class="flex gap-1 items-center ">
      <svg
        class="fill-transparent stroke-black h-4 w-4 border border-black"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
      </svg>
      Label
    </label>
  `,
});

export const CustomIcon3: Story<CheckboxInputComponent> = (args: any) => ({
  props: args,
  template: /* HTML */ `
    <input cpt-checkbox [indeterminate]=${args.indeterminate} [checked]="${args.checked}" id="check1" class="[&:not(.indeterminate):checked~label_.checked]:block [&.indeterminate~label_i.indeterminate]:block" />
    <label for="check1" class="flex gap-1 items-center ">
      <label for="check1" class="border border-black inline-block h-4 w-4">
        <i class="checked hidden leading-[14px] text-[13px] pis-[1px]">✓</i>
        <i class="indeterminate hidden leading-[12px] text-[15px] pis-[2px]">−</i>
      </label>
      <span>Label</span>
    </label>
  `,
});
