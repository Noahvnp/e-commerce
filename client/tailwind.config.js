/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Roboto", "san-serif"],
      main2: ["Poppins", "san-serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#DB4444",
      },
      colors: {
        main: "#DB4444",
      },
    },
  },
  plugins: [],
};
