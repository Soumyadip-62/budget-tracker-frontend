/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3fd467",
        hover: "#068a59",
        secondary: "#a23fd4",
        background: "#ebfcf4",
        personal: "#F581C5",
        official: "#FAC241",
        enterprice: "#91A13A",
      },
    },
  },
  plugins: [],
};
