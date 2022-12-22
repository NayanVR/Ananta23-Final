/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ['"Space Grotesk"', 'sans-serif'],
      'heading': ['Syne', 'sans-serif']
    },
    extend: {
      colors: {
        'primary': '#38E54D',
        'primary-dark': '#00B116',
        'primary-light': '#9CFF2E',
        'primary-light-1': '#BFFFC7',
        'primary-light-2': '#EDF0FF',
      }
    },
  },
  plugins: [],
}
