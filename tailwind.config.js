/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        top: "top",
        bottom: "bottom",
      },
    },
  },
  plugins: [],
};
