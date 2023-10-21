/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        'background': '#f4f6fb',
        'primary': {
          50: '#f2f9ff',
          100: '#e6f2ff',
          200: '#bfdeff',
          300: '#99caff',
          400: '#4da0ff',
          500: '#024a94',
          600: '#023e7d',
          700: '#02336b',
          800: '#022a5c',
          900: '#02214e',
        }
      }
    },
  },
  plugins: []
}

