/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "rgb(131, 80, 214)",
      },
      colors: {
        main: "rgb(131, 80, 214)",
      },
    },
  },
  plugins: [],
};
