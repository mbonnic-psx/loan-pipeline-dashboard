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
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#243660",
          dark: "#111d33",
        },
        brand: {
          purple: "#7C3AED",
          "purple-light": "#8B5CF6",
          "purple-dark": "#6B21A8",
        },
        surface: {
          DEFAULT: "#F4F6F9",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(27,42,74,0.08), 0 1px 2px -1px rgba(27,42,74,0.06)",
        "card-hover": "0 4px 12px 0 rgba(27,42,74,0.12), 0 2px 4px -1px rgba(27,42,74,0.08)",
        panel: "0 20px 60px -10px rgba(27,42,74,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
