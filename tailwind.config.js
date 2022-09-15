/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-1fr': 'auto 1fr',
      },
      gridTemplateColumns: {
        'grid-col-auto-1fr': 'auto 1fr',
      },
    },
  },
  plugins: [],
}
