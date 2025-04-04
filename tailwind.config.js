/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/*.{js,jsx,ts,tsx}", "./src/App.jsx"],
  theme: {
    extend: {
      colors: {
        gray: "#585050",
        light: "#e4e4e4",
        pokered: "#f63920",
        pokeblack: "#181818",
        pokegray: "#dbdbdb",
        pokewhite: "#efefef",
        lime: {
          300: "#BCF075",
          500: "#99e800",
          700: "#315911",
          900: "#204008",
        },
        slate: "#394141",
        slateDark: "#272929",
        aquaDark: "#327979",
        aquaLight: "#47CBAA",
        tealLight: "#C3FBF3",
        tealDark: "#205961",
        statRed: "#E9423F",
        statOrange: "#F67E00",
        statYellow: "#FBDC4A",
        statLime: "#A6E500",
        statGreen: "#49CD58",
        statAqua: "#40C2B8",
        genderMale: "#3273DC",
        genderFemale: "#FF4488",
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
        tilesGreen: "url('/tiles-green.png')",
        tilesBlack: "url('/tiles-black.png')",
        tilesWhite: "url('/tiles-white.png')",
        tilesMovingGreen: "url('/tiles-green.gif')",
        tilesMovingBlack: "url('/tiles-black.gif')",
        ruler: "url('/ruler.png')",
        rulerHead: "url('/ruler-head.png')",
        stripes: "url('/stripe-pattern.png')",
        stripesMoving: "url('/stripe-pattern.gif')",
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
        ".text-shadow-mini": {
          textShadow: "1px 0px #a0a0a0, 0px 1px #a0a0a0, 1px 1px #a0a0a0",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      });
    },
  ],
};
