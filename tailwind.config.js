/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: {
          200: "#e9cfa6",
          300: "#F7CCA3",
          400: "#d7ad6d",
        },
        green: {
          800: "#69754e",
        },
      },
      boxShadow: {
        deep: "11px 20px 19px 0px rgba(0,0,0,0.53);",
        "deep-float": "8px 20px 24px 4px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],

  safelist: ["pt-32", "max-w-5xl", "mx-auto", "md:pt-20", "mb-32", "underline"],
};
