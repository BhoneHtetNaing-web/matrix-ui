/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        matrix: "#00ff00"
      },
      fontFamily: {
        mono: ["Courier New", "monospace"]
      }
    }
  },
  plugins: []
}