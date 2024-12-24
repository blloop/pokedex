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
        gray: "#585050",
        light: "#e4e4e4",
        lime: "#99e800",
        limeDark: "#315911",
        limeLight: "#BCF075",
      },
      transitionProperty: {
        left: "left",
        right: "right",
        filter: "filter",
      },
      backgroundImage: {
        tiles: "url('/public/tiles.png')",
        tilesBlack: "url('/public/tiles-black.png')",
        stripes: "url('/public/stripe-pattern.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-gray": {
          textShadow:
            "1px 0px 0px #a0a0a0, 0px 1px 0px #a0a0a0, 1px 1px 0px #a0a0a0",
        },
        ".text-shadow-dark": {
          textShadow:
            "1px 0px 0px #808281, 0px 1px 0px #808281, 1px 1px 0px #808281",
        },
      });
    },
  ],
};
