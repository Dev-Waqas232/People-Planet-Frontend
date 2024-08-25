/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B08BF8',
      },
      fontFamily: {
        primary: ['Raleway', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
