/** @type {import('tailwindcss').Config} */
export default {
  content: ['/index.html', './**/*.{html,js}'],
  theme: {
    extend: {
      lineHeight: {
        'extra-loose': '2.5',
        12: '3rem',
      },
    },
  },
  plugins: [],
}
