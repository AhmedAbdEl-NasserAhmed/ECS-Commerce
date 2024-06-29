import type { Config } from "tailwindcss";

const config: Config = {
  content: [
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
      },
      gridTemplateColumns: {
        // Custom grid template columns
        "autofill-minmax": "repeat(auto-fit, minmax(30rem, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
