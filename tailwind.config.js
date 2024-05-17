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
        error: '#EB4852',
        modalBg: 'rgba(0,0,0,0.4)',
      },
      boxShadow: {
        dd: '0 4px 10px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
