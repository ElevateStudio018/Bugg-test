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
        steel: "#7C8AA3",
        mist: "#F2F4F7",
        gray: {
          body: "#666666",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: ["88px", { lineHeight: "0.98", fontWeight: "800", letterSpacing: "-0.02em" }],
        "h1-mobile": ["44px", { lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.02em" }],
        h2: ["56px", { lineHeight: "1.02", fontWeight: "800", letterSpacing: "-0.02em" }],
        "h2-mobile": ["36px", { lineHeight: "1.08", fontWeight: "800", letterSpacing: "-0.01em" }],
        h3: ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        eyebrow: ["12px", { lineHeight: "1.4", fontWeight: "700", letterSpacing: "0.18em" }],
      },
      spacing: {
        18: "72px",
        22: "88px",
      },
      maxWidth: {
        content: "1440px",
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
