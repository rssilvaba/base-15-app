// Button.stories.ts

import { Meta, Story } from '@storybook/angular/';
import { AlbatrossContainerComponent } from './albatross-container.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/AlbatrossContainerComponent',
  component: AlbatrossContainerComponent,
  // argTypes: {
  //   indeterminate: {
  //     control: { type: 'boolean' },
  //   },
  //   checked: {
  //     control: { type: 'boolean' },
  //   },
  // },
  // decorators: [componentWrapperDecorator((story) => `<div class="p-2">${story}<label>Label</label></div>`)],
} as Meta;

//👇 We create a “template” of how args map to rendering
const templateTemplate = /* HTML */ `
  <div class="CheckboxGroup" style="flex-direction: column; display: flex">
    <label style="display: block">Group Label</label>
    <div cpt-albatross class="[column-gap:0.4rem] [&_.Checkbox>input]:mr-1">
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp1" />
        <label for="cinp1">Label</label>
      </div>
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp2" />
        <label for="cinp2">Label</label>
      </div>
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp3" />
        <label for="cinp3">Label</label>
      </div>
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp4" />
        <label for="cinp4">Label</label>
      </div>
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp5" />
        <label for="cinp5">Label</label>
      </div>
      <div class="Checkbox">
        <input type="checkbox" name="groupName" id="cinp6" />
        <label for="cinp6">Label</label>
      </div>
    </div>
  </div>
`;
const Template: Story = (args) => ({
  props: args,

  template: templateTemplate,
});

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
