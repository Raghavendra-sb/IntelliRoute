/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['index.html', 'src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6E72FC',
          dark: '#5B5FEA'
        },
        glass: 'rgba(255,255,255,0.08)'
      },
      boxShadow: {
        glow: '0 0 20px rgba(110,114,252,0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [
    // typography for `prose` classes used in markdown rendering
    require('@tailwindcss/typography')
  ]
}