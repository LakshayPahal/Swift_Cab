/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3f51b5',
        secondary: '#00c853',
        dark: '#1a237e',
        light: '#f5f7ff',
        success: '#00c853',
        warning: '#ffab00',
        error: '#d50000',
        gray: {
          light: '#f8f9fa',
          medium: '#e0e0e0',
          DEFAULT: '#616161',
          dark: '#424242',
        }
      },
      boxShadow: {
        DEFAULT: '0 5px 15px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.1)',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
    },
  },
  plugins: [],
} 