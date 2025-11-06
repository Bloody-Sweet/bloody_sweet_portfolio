/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {     
       colors: {
      // pick your hex: #f2ede8 (or #f5f1ed if you prefer)
      "warm-beige": "#f2ede8",
      "card-cream": "#f8f6f3"
    },},
  },
  plugins: [],
}

