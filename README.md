# OptiClinic

Frontend: Vite + React + TypeScript + Tailwind + Chart.js · Backend: FastAPI + SciPy (HiGHS).

## Backend (terminal 1)
    cd backend
    python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
    pip install -r requirements-dev.txt
    uvicorn app.main:app --reload --port 8000           # docs: http://localhost:8000/docs
    pytest                                              # pruebas del solver

## Frontend (terminal 2)
    npm install
    npm run dev                                         # http://localhost:5173  (/api -> :8000)

Producción: define `VITE_API_URL` (frontend) y `CORS_ORIGINS` (backend).

## Con Docker (un solo comando)
    docker compose up --build        # abre http://localhost:8080
    docker compose down              # detener

El frontend se sirve con nginx, que reenvía `/api` al backend dentro de la red de Docker (no hace falta CORS).

## CI
`.github/workflows/ci.yml` corre en cada push y pull request: pruebas del backend (pytest), pruebas y build del frontend (Vitest + tsc + Vite) y construcción de las imágenes Docker. Sube también `package-lock.json` al repositorio.
