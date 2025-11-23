/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-black': '#1a1a1a',
        'theme-gold': '#d4af37',
        'theme-gold-light': '#f4d03f',
        'theme-gold-dark': '#b8942c',
        'theme-charcoal': '#2d2d2d',
        'theme-gray': '#3a3a3a',
      },
      fontFamily: {
        'romantic': ['"Playfair Display"', 'serif'],
        'modern': ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
