import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import OptimizeRequest
from .solver import Activity, Scenario, solve

app = FastAPI(title="OptiClinic API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


@app.get("/api/v1/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/optimize")
def optimize(req: OptimizeRequest):
    scenario = Scenario(
        activities=[Activity(a.id, a.demand, (a.prod_gpt, a.prod_kimi), (a.cost_gpt, a.cost_kimi)) for a in req.activities],
        budget=req.budget,
        capacity=(req.capacity_gpt, req.capacity_kimi),
    )
    return solve(scenario)  # infactible => 200 con feasible=false (resultado de negocio, no error HTTP)
