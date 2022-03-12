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
          50: "#FF7A27",
          100: "#EC7023",
        },
        tertiary: {
          100: "#CBD4C2",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
