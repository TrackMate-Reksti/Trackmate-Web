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
      colors: {
        blue: {
          primary: "#312ECB",
          secondary: "#3331A3",
          ternary: "#4285F4",
        },
        gray: {
          primary: "#E0E0E0",
          secondary: "#828282",
          ternary: "#6E6E6E",
        },
        yellow: {
          primary: "#FBBC05",
        },
        green: {
          primary: "#4AC959",
        },
        red: {
          primary: "#EB4335",
        },
      }
    },
  },
  plugins: [],
};
export default config;
