import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12151C",
          soft: "#1B1F29",
          line: "#2A2F3B",
        },
        paper: {
          DEFAULT: "#F6F5F1",
          dim: "#EBE9E2",
        },
        signal: {
          DEFAULT: "#E8A33D",
          dim: "#C98A2E",
        },
        teal: {
          DEFAULT: "#3E7C7B",
        },
        live: {
          DEFAULT: "#E4572E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18, 21, 28, 0.06), 0 8px 24px -8px rgba(18, 21, 28, 0.12)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
