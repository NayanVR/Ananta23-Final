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
      },
      keyframes: {
        wiggleLeft: {
          '0%, 100%': { transform: 'translateX(-30%) translateY(-50%)' },
          '50%': { transform: 'translateX(30%) translateY(-50%)' },
        },
        wiggleRight: {
          '0%, 100%': { transform: 'translateX(30%) translateY(-50%)' },
          '50%': { transform: 'translateX(-30%) translateY(-50%)' },
        }
      },
      animation: {
        wiggleLeft: 'wiggleLeft 3s ease-in-out infinite',
        wiggleRight: 'wiggleRight 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
