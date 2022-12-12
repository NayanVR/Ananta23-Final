/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'primary': '#099BFA',
      'primary-dark': '#003252',
      'primary-light': '#71C3F7',
      'primary-light-1': '#C1E0FF',
      'primary-light-2': '#EDF0FF',
    }
  },
  plugins: [],
}
