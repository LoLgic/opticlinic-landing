import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Cuando conectes FastAPI: proxy de /api al backend
  server: { proxy: { "/api": "http://localhost:8000" } },
});
