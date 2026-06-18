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
        "shimmer-slide": "shimmer-slide var(--speed, 3s) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed, 3s) * 2) infinite linear",
        "meteor": "meteor 5s linear infinite",
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
        "shimmer-slide": {
          to: { transform: "translate(calc(100cqw - 100%), 0)" },
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" },
        },
        meteor: {
          "0%": { transform: "rotate(var(--angle)) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(var(--angle)) translateX(-500px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
