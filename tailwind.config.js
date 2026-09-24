/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd2ff',
          300: '#8fb4ff',
          400: '#5b8cff',
          500: '#3366ff',
          600: '#1f47e6',
          700: '#1937b4',
          800: '#182f8f',
          900: '#182b73'
        }
      }
    }
  },
  plugins: []
}
