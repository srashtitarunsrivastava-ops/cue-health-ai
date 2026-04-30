/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#0D4F36', dark: '#0a3f2b', light: '#1a6b4a' },
        vital:  { DEFAULT: '#8BCF21', dark: '#6fa018', light: '#d4eea1' },
        ivory:  '#F7F6F1',
        sage:   { DEFAULT: '#DCE8D5', dark: '#c4d9b8', light: '#edf4e8' },
        charcoal: '#1B1D1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(13,79,54,0.08)',
        'card-hover': '0 8px 30px rgba(13,79,54,0.14)',
        'btn': '0 2px 8px rgba(13,79,54,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.4s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                    to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
