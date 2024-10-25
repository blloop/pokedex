/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // pokered: "#dc0a2d",
        pokered: "#f63920",
        pokeblack: "#181818",
        pokegray: "#dbdbdb",
        pokewhite: "#efefef",
        dark: "#383838",
        light: "#e4e4e4",
      },
      transitionProperty: {
        left: "left",
        right: "right",
      },
      backgroundImage: {
        tiles: "url('/public/tiles.png')",
        tilesBlack: "url('/public/tiles-black.png')",
      },
      dropShadow: {
        gray: "2px 2px 1px #888888",
      },
      boxShadow: {
        window: "inset 0px 0px 4px 1px #444",
      },
    },
  },
  plugins: [],
};
