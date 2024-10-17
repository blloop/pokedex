/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pokered: "#dc0a2d",
      },
      transitionProperty: {
        left: "left",
        right: "right",
      },
    },
  },
  plugins: [],
};
