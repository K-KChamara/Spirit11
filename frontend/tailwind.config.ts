import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
