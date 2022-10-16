/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkRed: "#952525",
        lightRed: "#E63131",
        green: "#22AF39",
        darkGray: "#333333",
        lightGray: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
