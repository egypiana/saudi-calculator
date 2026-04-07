import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a6b3c",
          50: "#e8f5ee",
          100: "#d1eadd",
          200: "#a3d5bb",
          300: "#75c099",
          400: "#47ab77",
          500: "#2d8a52",
          600: "#1a6b3c",
          700: "#155a32",
          800: "#104828",
          900: "#0b371e",
          950: "#052510",
        },
        gold: {
          DEFAULT: "#c9a84c",
          50: "#fdf8eb",
          100: "#f5ecd4",
          200: "#edd9a9",
          300: "#e0c373",
          400: "#d4b05a",
          500: "#c9a84c",
          600: "#a88a3a",
          700: "#8a6d2b",
          800: "#6b521f",
          900: "#4a3815",
        },
        surface: "#ffffff",
        background: "#f8f9fa",
        "text-primary": "#343a40",
        "text-secondary": "#6c757d",
        success: "#10b981",
        error: "#ef4444",
        dark: {
          DEFAULT: "#0f1f16",
          bg: "#0f1f16",
          surface: "#1a2e23",
          text: "#f1f5f9",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans Arabic", "Noto Sans Arabic", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-in",
        "countdown-pulse": "countdownPulse 1s ease-in-out",
        "counter-up": "counterUp 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        countdownPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        counterUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
