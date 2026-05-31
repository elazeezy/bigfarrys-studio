/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDF8F2',
          100: '#F7EEE2',
          200: '#EFD9C0',
          DEFAULT: '#F2E4CE',
        },
        espresso: {
          light: '#8B5E3C',
          DEFAULT: '#5C2D1A',
          dark: '#3B1A0C',
        },
        mocha: '#7C4A2D',
        sand: '#C9A882',
        bark: '#9B6B47',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
};
