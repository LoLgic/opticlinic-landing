# OptiClinic – Landing

Vite + React 18 + TypeScript + Tailwind CSS. Tema claro/oscuro con variables CSS (`src/index.css`).

    npm install
    npm run dev      # http://localhost:5173
    npm run build

Contenido editable en `src/data.ts`. El cálculo del simulador es de demostración
(`src/components/Simulator.tsx`, marcado con TODO): se reemplaza por `POST /api/v1/optimize` (FastAPI, proxy en `vite.config.ts`).
