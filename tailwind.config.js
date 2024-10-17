/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // pokered: "#dc0a2d",
        pokered: "#f63920",
        pokeblack: "#212121",
        pokewhite: "#dbdbdb",
        dark: "#383838",
        light: "#e4e4e4",
      },
      transitionProperty: {
        left: "left",
        right: "right",
      },
      backgroundImage: {
        tiles: "url('/public/tiles.png')",
      },
      dropShadow: {
        gray: "2px 2px 1px #888888",
      },
    },
  },
  plugins: [],
};
