/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      colors: {
        red: '#EE3918',
        modalBg: 'rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
