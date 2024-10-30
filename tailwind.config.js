import plugin from "tailwindcss";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "selector", // or 'media'
};
