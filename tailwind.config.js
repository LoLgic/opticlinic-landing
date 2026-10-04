const c = (v) => `rgb(var(--${v}) / <alpha-value>)`;
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        bg: c("bg"), surface: c("surface"), card: c("card"), chip: c("chip"), line: c("line"),
        ink: c("ink"), muted: c("muted"), brand: c("brand"), cyan2: c("cyan"), ok: c("ok"), warn: c("warn"),
      },
      boxShadow: { card: "0 20px 50px -20px rgba(11,27,58,.25)" },
    },
  },
  plugins: [],
};
