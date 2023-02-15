import { Component, NgModule } from "@angular/core";
import { Story, Meta } from '@storybook/angular/types-6-0';

@Component({
  selector: "my-component, MyComponent",
  standalone: true,
  template: `
    <ng-container>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <input
        class="shadow-md rounded w-full px-4 py-2"
        placeholder="What is your name?"
        [attr.value]="name"
        (input)="
      name = $event.target.value;
    "
      />

      <h1 class="text-lg h1">Hello, {{name}} !</h1>
    </ng-container>
  `,
  styles: [
    `
      .h1 {
        margin-top: 10px;
      }
    `,
  ],
})
export class MyComponent {
  name = "Steve";
}

export default {
  title: 'Example/MyComponent',
  component: MyComponent,
  // render: (args) => {
  //   const { label, ...props } = args;
  //   return {
  //     props,
  //     template: `
  //       <input cpt-checkbox-input id="test2" class="dwr" checked />
  //     `,
  //   };
  // },
} as Meta;

// const Template: Story<Page> = (args: Page) => ({
//   props: args,
// });

// More on interaction testing: https://storybook.js.org/docs/angular/writing-tests/interaction-testing
export const SampleMyComponent = (args: any) => ({
  args,
});
