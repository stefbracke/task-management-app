import plugin from "tailwindcss";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        purple: {
          150: "#BB86FC",
        },
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      // Custom colors based on your provided palette
      primary: {
        DEFAULT: "#BB86FC", // Primary color
        variant: "#3700B3", // Primary Variant
      },
      secondary: "#03DAC6", // Secondary color
      background: "#121212", // Background color
      surface: "#121212", // Surface color
      error: "#CF6679", // Error color

      // Text colors for different contexts
      "on-primary": "#000000", // Text on Primary
      "on-secondary": "#000000", // Text on Secondary
      "on-background": "#FFFFFF", // Text on Background
      "on-surface": "#FFFFFF", // Text on Surface
      "on-error": "#000000", // Text on Error

      white: "#ffffff", // Default white color for general usage
    },
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
