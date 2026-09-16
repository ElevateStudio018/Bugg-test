import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgb(253, 190, 51)",
        dark: "#030F27",
        gray: {
          body: "#666666",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["60px", { lineHeight: "1.15", fontWeight: "700" }],
        "h1-mobile": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-mobile": ["30px", { lineHeight: "1.25", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.3", fontWeight: "600" }],
      },
      spacing: {
        18: "72px",
        22: "88px",
      },
      maxWidth: {
        content: "1280px",
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
        "ken-burns": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.16)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "modal-in": "modal-in 0.2s ease-out forwards",
        "ken-burns": "ken-burns 20s ease-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
