/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        160: "40rem",
        13: "3.2rem",
        100: "33.6rem",
        25: "5.25rem",
      },

      height: {
        15: "3.75rem",
      },

      fontFamily: {
        arial: "Arial, Helvetica, sans-serif",
        sans: ["PT Sans", "ui-sans-serif", "system-ui"],
      },

      fontSize: {
        clamp1: "clamp(0.3125rem, 0.1144rem + 0.8451vi, 0.875rem)",
        clamp2: "clamp(0.375rem, 0.1109rem + 1.1268vi, 1.125rem)",
        clamp3: "clamp(0.1875rem, -0.0546rem + 1.0329vi, 0.875rem)",
        clamp4: "clamp(0.25rem, -0.0141rem + 1.1268vi, 1rem)",
      },

      inset: {
        25: "6.25rem",
      },
    },
  },
  plugins: [],
};
