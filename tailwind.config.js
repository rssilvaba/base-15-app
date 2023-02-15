var plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [
    require('tailwindcss-logical'),
    require('@tailwindcss/line-clamp'),
    plugin(function (args) {
      var addUtilities = args.addUtilities
      var newUtilities = {
        '.ring-blur': {
          '--tw-ring-offset-shadow':
            'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
          '--tw-ring-shadow':
            'var(--tw-ring-inset) 0 0 1.5px calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
          'box-shadow':
            'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
        },
        '.shadow-inner2': {
          '--tw-shadow': 'inset 0 8px 4px -4px rgb(0 0 0/0.2)',
          '--tw-shadow-colored': 'inset 0 2px 4px 0 var(--tw-shadow-color)',
          'box-shadow':
            'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}
