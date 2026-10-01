import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: { DEFAULT: "#3D4724", dark: "#2F3719" },
        moss: { DEFAULT: "#849E3F", dark: "#6F8733" },
        sand: "#E3E1D8",
        cream: "#F2F0E9",
        ink: "#222222",
        coal: "#333333",
        ash: "#8C8A82",
      },
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ["34px", { lineHeight: "1.12", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-lg": ["60px", { lineHeight: "1.06", letterSpacing: "-0.015em", fontWeight: "600" }],
        h2: ["31px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h2-lg": ["46px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["22px", { lineHeight: "1.25", fontWeight: "600" }],
        lead: ["19px", { lineHeight: "1.5" }],
        copy: ["17px", { lineHeight: "1.65" }],
        label: ["15px", { lineHeight: "1.35", letterSpacing: "0.14em", fontWeight: "700" }],
        tag: ["13px", { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "700" }],
      },
      maxWidth: {
        content: "1280px",
        prose: "720px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "modal-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "modal-in": "modal-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
