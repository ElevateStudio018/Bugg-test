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
        olive: { DEFAULT: "#1C2817", dark: "#131C10" },
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
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        // A short bright stretch running down a thin line, then a pause before the next.
        "scroll-cue": {
          "0%": { transform: "translateY(-100%)" },
          "65%, 100%": { transform: "translateY(200%)" },
        },
        "pin-drop": {
          "0%": { opacity: "0", transform: "translateY(-18px)" },
          "55%": { opacity: "1", transform: "translateY(0)" },
          "75%": { transform: "translateY(-5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "error-in": {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "toast-timer": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "modal-in": "modal-in 0.2s ease-out forwards",
        // Held hidden through its delay ("both"), so staggered lines appear in turn.
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "rise-fast": "rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scroll-cue": "scroll-cue 2.4s cubic-bezier(0.65, 0, 0.35, 1) 1.6s infinite both",
        "pin-drop": "pin-drop 0.8s cubic-bezier(0.33, 1, 0.68, 1) both",
        "error-in": "error-in 0.25s ease-out both",
        // Its duration is set where it is used, to match how long the thank-you stays.
        "toast-timer": "toast-timer linear both",
      },
    },
  },
  plugins: [],
};

export default config;
