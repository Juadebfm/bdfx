/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#F91212",
        mainWhite: "#FEFEFE",
      },
      fontFamily: {
        latoFont: ["Lato", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"],
        rubikFont: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
