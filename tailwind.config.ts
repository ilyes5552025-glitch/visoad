import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B5ED7",
        accent: "#E63946",
        dark: "#0F172A",
        light: "#F8FAFC",
        card: "#F1F5F9",
      },
    },
  },
  plugins: [],
};

export default config;
