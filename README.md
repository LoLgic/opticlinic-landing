# OptiClinic

Frontend: Vite + React + TypeScript + Tailwind + Chart.js · Backend: FastAPI + SciPy (HiGHS).

## Backend (terminal 1)
    cd backend
    python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8000           # docs: http://localhost:8000/docs
    pytest                                              # pruebas del solver

## Frontend (terminal 2)
    npm install
    npm run dev                                         # http://localhost:5173  (/api -> :8000)

Producción: define `VITE_API_URL` (frontend) y `CORS_ORIGINS` (backend).
