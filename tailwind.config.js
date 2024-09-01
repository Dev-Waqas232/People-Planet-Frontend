/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '790px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
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
