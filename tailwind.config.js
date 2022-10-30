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
        fadeOut: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-70%)" },
        },
      },
      animation: {
        loader: "loading 1s infinite",
        fadeToast: "fadeInToast 0.3s",
        fade: "fadeIn 0.5s",
        fadeOut: "fadeOut 0.5s",
      },
    },
  },
  plugins: [],
};
