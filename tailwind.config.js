/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:      "rgb(var(--ink) / <alpha-value>)",
        paper:    "rgb(var(--paper) / <alpha-value>)",
        bone:     "rgb(var(--bone) / <alpha-value>)",
        amber:    "rgb(var(--amber) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        dust:     "rgb(var(--dust) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans:    ["DM Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif:   ["Cormorant Garamond", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest:   "0.35em",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
