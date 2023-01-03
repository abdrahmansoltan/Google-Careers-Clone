/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme"); // import the js-theme-object

module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // extend some tailwind properties
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans], // add the open-sans font from https://fonts.google.com/
      },
      colors: {
        // create custom color classes
        "brand-gray-1": "#dadce0",
        "brand-blue-1": "#1967d2",
        "brand-green-1": "#137333",
      },
      boxShadow: {
        blue: "0 0 3px 3px #4285f4",
      },
    },
  },
  plugins: [],
};
