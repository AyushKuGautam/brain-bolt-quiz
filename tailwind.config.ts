import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3b82f6",
          success: "#22c55e",
          danger: "#ef4444",
        },
      },
      borderRadius: {
        quiz: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
