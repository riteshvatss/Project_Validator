/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      /* ---------------------------
         Animations
      ---------------------------- */
      animation: {
        // Page & section entry
        "page-enter": "fadeUp 0.6s ease-out",
        "section-enter": "fadeUp 0.7s ease-out",
        "textReveal": "textReveal 0.9s ease-out",
        "fadeIn": "fadeIn 0.6s ease-out",

        // Cards
        "cardReveal": "cardReveal 0.7s ease-out forwards",
        "cardFloat": "cardFloat 6s ease-in-out infinite",

        // Ambient motion
        "orb1": "orb1 18s ease-in-out infinite",
        "orb2": "orb2 22s ease-in-out infinite",

        // Images & subtle motion
        "imageFloat": "imageFloat 6s ease-in-out infinite",

        // Divider pulse
        "pulseSlow": "pulseSlow 3s ease-in-out infinite",
      },

      /* ---------------------------
         Keyframes
      ---------------------------- */
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },

        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },

        textReveal: {
          from: {
            opacity: 0,
            transform: "translateY(24px) scale(0.95)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },

        cardReveal: {
          from: {
            opacity: 0,
            transform: "translateY(30px) scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) scale(1)",
          },
        },

        cardFloat: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },

        imageFloat: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        orb1: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(120px, 80px)" },
        },

        orb2: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-100px, -120px)" },
        },

        pulseSlow: {
          "0%,100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
