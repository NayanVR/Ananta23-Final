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
        'primary': '#1C7690',
        'primary-dark-1': '#012C3D',
        'primary-dark-2': '#022539',
        'primary-light-1': '#78BDC4',
        'primary-light-2': '#A5D9D5',
      }
    },
  },
  plugins: [],
}
