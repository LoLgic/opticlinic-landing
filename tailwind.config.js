/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        navy: "#0B1B3A",
        brand: { DEFAULT: "#0B4EA2", dark: "#083B7A" },
        cyan2: "#06A8CC",
        surface: "#F4F8FC",
        ok: "#12A150",
      },
      boxShadow: { card: "0 20px 50px -20px rgba(11,27,58,.25)" },
    },
  },
  plugins: [],
};
