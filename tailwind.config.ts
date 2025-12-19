import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB",
        brand: {
          50: "#E6FAF7",
          100: "#C2F3EA",
          200: "#8AE7D8",
          300: "#4DD9C5",
          400: "#1BCBB3",
          500: "#08B5A0",
          600: "#049281",
          700: "#057365",
          800: "#085A50",
          900: "#084A42"
        },
        cta: {
          500: "#F97316",
          600: "#EA580C"
        }
      },
      borderRadius: {
        xl: "16px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

