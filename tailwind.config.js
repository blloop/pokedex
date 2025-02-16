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
        slate: "#383838",
        gray: "#585050",
        light: "#e4e4e4",
        lime: "#99e800",
        limeDark: "#315911",
        limeDarker: "#204008",
        limeLight: "#BCF075",
        bug: "#A9B723",
        dark: "#6F5848",
        dragon: "#6E36F0",
        electr: "#F9D233",
        fight: "#C32E2A",
        fire: "#F07F2F",
        flying: "#A98FEF",
        ghost: "#715899",
        grass: "#78C750",
        ground: "#E0C06E",
        ice: "#98D8D8",
        normal: "#A9A87B",
        poison: "#A0419F",
        psychc: "#F55685",
        rock: "#B99F39",
        steel: "#B9B8D1",
        water: "#6A8CFF",
      },
      transitionProperty: {
        left: "left",
        right: "right",
        filter: "filter",
      },
      backgroundImage: {
        tiles: "url('/public/tiles.png')",
        tilesBlack: "url('/public/tiles-black.png')",
        tilesWhite: "url('/public/tiles-white.png')",
        ruler: "url('/public/ruler.png')",
        rulerHead: "url('/public/ruler-head.png')",
        stripes: "url('/public/stripe-pattern.png')",
      },
      boxShadow: {
        window: "inset 0px 0px 4px rgb(0, 0, 0)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-gray": {
          textShadow: "2px 0px #a0a0a0, 0px 2px #a0a0a0, 2px 2px #a0a0a0",
        },
        ".text-shadow-slate": {
          textShadow: "2px 0px #808281, 0px 2px #808281, 2px 2px #808281",
        },
        ".text-shadow-black": {
          textShadow: "2px 0px #383838, 0px 2px #383838, 2px 2px #383838",
        },
      });
    },
  ],
};
