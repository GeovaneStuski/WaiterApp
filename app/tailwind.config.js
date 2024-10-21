/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-main': '#333333',
        'gray-main': '#666666',
        'gray-light': '#CCCCCC',
        'red-main': '#D73035',
      }
    },
  },
  plugins: [],
};


