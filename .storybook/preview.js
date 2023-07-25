import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  layout: 'fullscreen',
  // actions: { argTypesRegex: "^on[A-Z].*" },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
  viewport: {
    viewports: {
      small: { name: 'small', styles: { width: '360px', height: '640px' } },
      medium: { name: 'medium', styles: { width: '540px', height: '720px' } },
      large: { name: 'large', styles: { width: '720px', height: '90%' } },
      full: { name: 'full', styles: { width: '100%', height: '100%' } },
    }
  },
  docs: { inlineStories: true },
}