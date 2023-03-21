/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false,
  },
};
