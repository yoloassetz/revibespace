// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",    // your violet
        secondary: "#A29BFE",  // lighter accent
        accent: "#00B894",     // green highlights
        darkBg: "#2D3436"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        "128": "32rem",        // if you need extra-large containers
      },
    },
  },
  plugins: [],
};