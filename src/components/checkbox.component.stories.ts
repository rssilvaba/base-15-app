// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxInputComponent } from './checkbox.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Checkbox',
  component: CheckboxInputComponent,
  render: (args) => {
    const { label, ...props } = args;
    return {
      props,
      template: `
        <input cpt-checkbox-input id="test2" class="dwr" checked />
      `,
    };
  },
} as Meta;

// const Template: Story<Page> = (args: Page) => ({
//   props: args,
// });

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const Default = {
  args: {
    id: 'tersd',
    label: 'Default Label',
  },
};

export const Checked = {
  args: {
    id: 'tersd',
    checked: true,
    label: 'Checked Label',
  },
};
export const Unlabeled = {
  args: {
    id: 'tersd',
    checked: true,
  },
};
