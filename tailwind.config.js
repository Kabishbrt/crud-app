/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "white", 
        none: "none",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],  // This adds the 'Quicksand' font to your theme
      },
    },
  },
  plugins: [],
}
