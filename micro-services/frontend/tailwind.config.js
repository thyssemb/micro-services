/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'navbar-bg': '#131313',
        'navbar-border': '#242424',
        'register-border': '#242424',
        'tchat-bg': '#131313',
        'tchat-border': '#242424',
      },
    },
  },
  plugins: [],
}
