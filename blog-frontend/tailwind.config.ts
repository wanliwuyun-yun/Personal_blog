import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        star: {
          dark: "#0a0e1f",
          blue: "#1e2948",
          light: "#c0d8ff",
          purple: "#8b5cf6",
        },
      },
      boxShadow: {
        glow: "0 0 10px #c0d8ff, 0 0 20px #1e2948",
        "glow-purple": "0 0 10px #8b5cf6, 0 0 20px #1e2948",
        "glow-white": "0 0 8px rgba(192, 216, 255, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
