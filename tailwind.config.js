/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D2727",
        secondary: "#413543",
        purple: "#8F43EE",
        yellow: "#F0EB8D",
      },
      container: {
        padding: "1rem",
      },
      fontFamily: {
        sans: ["Kanit", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false,
  },
};
