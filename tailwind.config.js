module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#173E55",
        },
        secondary: {
          50: "#E5652A",
          100: "#E5652A",
        },
        tertiary: {
          100: "#FFFFFC",
        },
        quaternary: {
          100: "#8D7471",
        },
        update: {
          100: "#EEB902",
        },
        delete: {
          100: "#BB342F",
        },
        create: {
          100: "#3FB4F2",
        },
      },
      width: {
        carnet: "354px",
      },
      height: {
        carnet: "418px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
