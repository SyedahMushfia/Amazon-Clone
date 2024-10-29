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
        clamp5: "clamp(0.4375rem, 0.0854rem + 1.5023vi, 1.4375rem)",
        clamp6: "clamp(0.3125rem, 0.1364rem + 0.7512vi, 0.8125rem)",
        clamp7: "clamp(0.25rem, 0.0519rem + 0.8451vi, 0.8125rem)",
        clamp8: "clamp(0.3125rem, 0.1144rem + 0.8451vi, 0.875rem)",
        clamp9: "clamp(0.25rem, 0.0519rem + 0.8451vi, 0.8125rem)",
        clamp10: "clamp(0.3125rem, 0.0924rem + 0.939vi, 0.9375rem)",
        clamp11: "clamp(0.375rem, 0.1329rem + 1.0329vi, 1.0625rem)",
        clamp12: "clamp(0.3125rem, 0.0539rem + 1.1033vi, 1.0469rem)",
        clamp13: "clamp(0.2656rem, -0.004rem + 1.1502vi, 1.0313rem)",
        clamp14: "clamp(0.25rem, 0.0739rem + 0.7512vi, 0.75rem)",
        clamp15: "clamp(0.625rem, 0.3829rem + 1.0329vi, 1.3125rem)",
        clamp16: "clamp(0.75rem, 0.3759rem + 1.5962vi, 1.8125rem)",
        clamp17: "clamp(0.5rem, 0.2579rem + 1.0329vw, 1.1875rem)",
        clamp18: "clamp(0.9375rem, 0.6954rem + 1.0329vw, 1.625rem)",
        clamp19: "clamp(0.875rem, 0.743rem + 0.5634vw, 1.25rem)",
      },

      inset: {
        25: "6.25rem",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
