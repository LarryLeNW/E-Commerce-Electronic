/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        outside: "url('assets/bg-login.jpg')",
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "rgb(131, 80, 214)",
      },
      colors: {
        main: "rgb(131, 80, 214)",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
          "100%": {
            "-webkit-transform": "translateY(-50px)",
            transform: "translateY(-50px);",
          },
          "slide-topsm": {
            "0%": {
              "-webkit-transform": "translateY(8px)",
              transform: "translateY(8px)",
            },
            "100%": {
              "-webkit-transform": "translateY(0)",
              transform: "translateY(0)",
            },
          },
        },
        animation: {
          "slide-top":
            "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
          "slide-topsm": "slide-topsm 0.5s linear both",
        },
      },
    },
    plugins: [],
  },
};
