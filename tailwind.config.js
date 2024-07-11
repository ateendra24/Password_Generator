/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card': '#202024',
        'card_text': '#dbdbd7',
        'background': '#100f10',
      },
    },
  
  },
  plugins: [],
}

