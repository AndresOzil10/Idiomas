// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    backgroundImage: {
      'background' : "url('../src/assets/images/fondo.jpg')",
      'fondo': "url('../src/assets/images/fondo.jpg')",
    },
  },
};
export const plugins = [];