// given that this is a build script, we can disable the import/no-extraneous-dependencies rule:
/* eslint-disable import/no-extraneous-dependencies */

const tailwindcssForms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssForms],
};
