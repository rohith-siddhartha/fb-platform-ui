/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto Mono', 'sans-serif'],
    },
    fontSize: {
      xsm: '13px',
      sm: '15px',
      md: '21px',
      xl: '30px',
      xxxl: '40px',
      xtl:'50px',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    borderRadius: {
      'none': '0',
      'sm': '2px',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      colors: {
        'primary': '#3168D840',
        'primary-dark': '#3168D8FF',
        'primary-pale': '#3168D810',
        'red': '#fa4f46',
        'blue': '#7fbef5',
        'green': '#08d450',
      }
    }
  },
  plugins: [],
}

