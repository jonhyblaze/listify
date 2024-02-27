/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-light": ["Geist-Light", ...defaultTheme.fontFamily.sans],
        geist: ["Geist", ...defaultTheme.fontFamily.sans],
        "geist-medium": ["Geist-Medium", ...defaultTheme.fontFamily.sans],
        "geist-bold": ["Geist-Bold", ...defaultTheme.fontFamily.sans],
        "geist-black": ["Geist-Black", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
