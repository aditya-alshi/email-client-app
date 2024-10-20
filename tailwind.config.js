/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './public/index.html' // apply to index.html as well
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E54065',
        background: '#F4F5F9',
        border: '#CFD2DC',
        text: '#636363',
        filterButton: '#E1E4EA',
        readBackground: '#F2F2F2',
      },
    },
  },
  plugins: [],
}

