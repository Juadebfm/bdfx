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
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        bdfx_red: "#f70000",
        bdfx_bg: "#FEFEFE",
      },
      fontSize: {
        base: "1.05rem",
        lg: "1.2rem",
        xl: "1.5rem",
        "2xl": "1.8rem",
        "3xl": "2rem",
        "4xl": "3rem",
        "5xl": "4rem",
        "6xl": "5rem",
        "7xl": "6rem",
      },
    },
  },
  plugins: [],
};
