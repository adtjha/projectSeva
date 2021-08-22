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
        4.5: "1.125rem",
        9: "2.25rem",
        18: "4.5rem",
        27: "6.75rem",
        45: "11.25rem",
        54: "13.5rem",
        63: "15.75rem",
        81: "20.25rem",
        90: "22.5rem",
        99: "24.75rem",
        108: "27rem",
        110: "28rem",
        117: "29.25rem",
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 2rem))",
        sm15: "repeat(15, minmax(0, 1.5rem))",
      },
      gridTemplateRows: {
        15: "repeat(15, minmax(0, 2rem))",
        sm15: "repeat(15, minmax(0, 1.5rem))",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      gridColumnStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
      gridColumnEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
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
        blue: colors.blue,
        green: colors.green,
        yellow: colors.yellow,
        red: colors.red,
      },
      animation: {
        dropdown: "dropdown 450ms ease-in 1",
        wiggle: "wiggle 300ms cubic-bezier(0.7, 0.01, 0.35, 1) infinite",
      },
      keyframes: {
        dropdown: {
          "0%": {
            transform: "translateY(-25%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
