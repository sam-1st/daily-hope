import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF6",
        "paper-dark": "#12191A",
        ink: "#26332F",
        "ink-soft": "#5A6C66",
        sky: {
          50: "#F1F7FA",
          100: "#E1EEF3",
          300: "#A9CBDA",
          500: "#5B8DA6",
          700: "#3C6B82",
        },
        emerald: {
          50: "#EEF5F0",
          100: "#D7E9DD",
          300: "#8FBBA0",
          500: "#3D7A5B",
          600: "#2F6B4F",
          700: "#245740",
        },
        gold: {
          200: "#F1E2AE",
          400: "#D8B24A",
          500: "#C9A227",
          600: "#A9860F",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(38, 51, 47, 0.18)",
        card: "0 4px 20px -6px rgba(38, 51, 47, 0.12)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 7s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
