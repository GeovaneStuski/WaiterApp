/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red-light': '#FFABAD',
        'red-main': '#D73035',
        'red-dark': '#8A1114',
        'gray-dark': '#333333',
        'gray-main': '#666666',
        'gray-light': '#999999',
        'gray-lighter': '#CCCCCC',
        'gray-extralight': '#FAFAFA',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },

        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },

        'scale-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },

        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },

        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-out': 'fade-out .3s ease-out forwards',
        'fade-in': 'fade-in .3s ease-out forwards',
        'scale-in': 'scale-in .2s ease-in-out forwards',
        'scale-out': 'scale-out .2s ease-in-out forwards',
        loader: 'rotation 1s linear infinite',
      },
      boxShadow: {
        'side-bar': '10px 0px 32px 0px #CCCCCC1A',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.hover-side::after': {
          content: '""',
          'background-color': '#D73035',
          height: '2px',
          width: '25%',
          display: 'block',
          transition: 'width .3s ease-in-out',
          'border-radius': '64px',
        },
      });
    },
  ],
};
