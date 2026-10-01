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
        olive: { DEFAULT: "#24321D", dark: "#1A2515" },
        moss: { DEFAULT: "#6E8B35", dark: "#5A7329" },
        sand: "#E3E1D8",
        cream: "#F2F0E9",
        ink: "#222222",
        coal: "#333333",
        ash: "#8C8A82",
        // Inactive carousel dot.
        pebble: "#B6B5AE",
      },
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      // Mobile sizes are width-matched against the reference screenshots (Figtree equivalents):
      // 17px body with tight ~1.12 leading, 29px section headings, 17px uppercase links.
      fontSize: {
        display: ["33px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-lg": ["60px", { lineHeight: "1.06", letterSpacing: "-0.015em", fontWeight: "600" }],
        h2: ["29px", { lineHeight: "1.14", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h2-lg": ["46px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["22px", { lineHeight: "1.18", fontWeight: "600" }],
        lead: ["19px", { lineHeight: "1.3" }],
        copy: ["17px", { lineHeight: "1.12" }],
        label: ["17px", { lineHeight: "1.18", letterSpacing: "0.03em", fontWeight: "700" }],
        tag: ["13px", { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "700" }],
        stat: ["50px", { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "800" }],
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
