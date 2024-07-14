/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        "opacity-visibility": "opacity, transform",
      },
      transitionDuration: {
        opacity: "500ms",
        transform: "500ms",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      variants: {
        extend: {
          transitionProperty: ["hover", "focus"],
          transitionDuration: ["hover", "focus"],
        },
      },
      colors: {
        mainColor: "#4170f2",
        accentColor: "#FDFDFD",
        heading: {
          color1: "#0a0d14",
        },
        paragraph: {
          color1: "#777c87",
        },
      },
      gridTemplateColumns: {
        // Custom grid template columns
        "autofill-minmax": "repeat(auto-fit, minmax(30rem, 1fr))",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("rtl", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.rtl .${e(`rtl${separator}${className}`)}`;
        });
      });
      addVariant("ltr", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.ltr .${e(`ltr${separator}${className}`)}`;
        });
      });
    }),
  ],
};
export default config;
