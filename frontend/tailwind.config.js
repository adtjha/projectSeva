const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        black: "1px solid black",
      },
      spacing: {
        110: "28rem",
        18: "4.5rem",
        27: "6.75rem",
        45: "11.25rem",
        54: "13.5rem",
        63: "15.75rem",
        81: "20.25rem",
        90: "22.5rem",
        99: "24.75rem",
        108: "27rem",
        117: "29.25",
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 2rem))",
        sm13: "repeat(13, minmax(0, 1.5rem))",
      },
      gridTemplateRows: {
        13: "repeat(13, minmax(0, 2rem))",
        sm13: "repeat(13, minmax(0, 1.5rem))",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
      },
      gridColumnStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
      },
      gridColumnEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
      },
      backgroundImage: (theme) => ({
        "safe-cell": "url(./images/safe.svg)",
      }),
      rotate: {
        "-360": "-360deg",
        360: "360deg",
      },
      colors: {
        blueGray: colors.blueGray,
        antiqueWhite: "#faebd7",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
