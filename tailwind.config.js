/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./src/**/*.{html,js,ts}"],
  // extract: {
    // ts: function (content) {
    //   // debugger
    //   // return content.match(/[^<>"'`\s]*/)
    //   // return content.match(/class="([^<>"'`\s]*)"/)
    //   return content.match(/class="([^"]*)"/) || content.match('');
    // }
  // }
},
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('tailwindcss-logical'),
    require('@tailwindcss/line-clamp'),
  ],
}
