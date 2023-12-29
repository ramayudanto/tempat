/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdeaea",
          100: "#f7bfbf",
          200: "#f4a0a0",
          300: "#ee7575",
          400: "#eb5a5a",
          500: "#e63131",
          600: "#d12d2d",
          700: "#a32323",
          800: "#7f1b1b",
          900: "#611515",
        },
        brandPrimary600: "#E63131",
        brandPrimary50: "#FDEAEA",
        darkRed: "#952525",
        lightRed: "#E63131",
        green: "#22AF39",
        darkGray: "#364152",
        lightGray: "#697586",
        customRed: {
          50: "#fdeaea",
          100: "#f7bfbf",
          200: "#f4a0a0",
          300: "#ee7575",
          400: "#eb5a5a",
          500: "#e63131",
          600: "#d12d2d",
          700: "#a32323",
          800: "#7f1b1b",
          900: "#611515",
        },
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(50%)" },
        },
        fadeInToast: {
          "0%": { opacity: 0, transform: "translateY(-70%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInLogin: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-70%)" },
        },
      },
      animation: {
        loader: "loading 1s infinite",
        fadeToast: "fadeInToast 0.3s",
        fade: "fadeIn 0.5s",
        fadeIn: "fade 0.3s",
        loginFade: "fadeInLogin 0.3s",
        fadeOut: "fadeOut 0.5s",
      },
    },
  },
  plugins: [],
};
