/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      'sans': ['"Space Grotesk"', 'sans-serif'],
      'heading': ['"Anek Latin"', 'sans-serif'],
      // 'heading': ['"IBM Plex Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#1C7690',
        'primary-dark-1': '#012C3D',
        'primary-dark-2': '#022539',
        'primary-light-1': '#78BDC4',
        'primary-light-2': '#A5D9D5',
        'primary-light-3': '#F2FFFE'
      },
      keyframes: {
        levitate: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(-60%)' },
          '50%': { transform: 'translateX(-50%) translateY(-80%)' },
        },
        aboutAnim: {
          '0%': {
            transform: 'translateX(50%) translateY(-50%) rotate(0deg)',
          },
          '100%': {
            transform: 'translateX(50%) translateY(-50%) rotate(360deg)',
          }
        }
      },
      animation: {
        levitate: 'levitate 5s ease-in-out infinite',
        aboutAnim: 'aboutAnim 30s linear infinite',
      }
    },
  },
  plugins: [
     require('@tailwindcss/forms'),
  ],
}
