"""Solver de Programación Lineal (sin dependencias de FastAPI, fácil de testear).

Variables:  X[i][j] = tareas de la actividad i asignadas al modelo j (0 = GPT-5.5, 1 = Kimi K3)
Max Z  = Σ p_ij · X_ij
s.a.    Σ c_ij · X_ij ≤ Presupuesto
        X_i0 + X_i1  = Demanda_i
        Σ_i X_ij     ≤ Capacidad_j
        X_ij ≥ 0
"""
from dataclasses import dataclass

import numpy as np
from scipy.optimize import linprog


@dataclass
class Activity:
    id: str
    demand: float
    prod: tuple[float, float]   # productividad por tarea (gpt, kimi)
    cost: tuple[float, float]   # costo USD por tarea (gpt, kimi)


@dataclass
class Scenario:
    activities: list[Activity]
    budget: float
    capacity: tuple[float, float]


def solve(s: Scenario) -> dict:
    n = len(s.activities)
    # Orden de variables: [x_00, x_01, x_10, x_11, ...]
    p = np.array([v for a in s.activities for v in a.prod], dtype=float)
    c = np.array([v for a in s.activities for v in a.cost], dtype=float)

    # linprog minimiza -> negamos la productividad
    A_ub = [c]
    b_ub = [s.budget]
    for j in (0, 1):
        row = np.zeros(2 * n)
        row[j::2] = 1
        A_ub.append(row)
        b_ub.append(s.capacity[j])

    A_eq, b_eq = [], []
    for i, a in enumerate(s.activities):
        row = np.zeros(2 * n)
        row[2 * i: 2 * i + 2] = 1
        A_eq.append(row)
        b_eq.append(a.demand)

    res = linprog(-p, A_ub=np.array(A_ub), b_ub=b_ub, A_eq=np.array(A_eq), b_eq=b_eq,
                  bounds=(0, None), method="highs")

    if res.status != 0:
        reason = {2: "Escenario infactible: el presupuesto o la capacidad no alcanzan para cubrir la demanda.",
                  3: "Problema no acotado."}.get(res.status, res.message)
        return {"feasible": False, "status": "infeasible" if res.status == 2 else "error", "message": reason}

    x = res.x.reshape(n, 2)
    rows = []
    for a, (g, k) in zip(s.activities, x):
        g, k = float(max(g, 0)), float(max(k, 0))
        rows.append({"id": a.id, "demand": a.demand, "gpt": g, "kimi": k,
                     "cost": g * a.cost[0] + k * a.cost[1]})
    gpt_total = sum(r["gpt"] for r in rows)
    kimi_total = sum(r["kimi"] for r in rows)
    total_cost = sum(r["cost"] for r in rows)
    demand = sum(a.demand for a in s.activities)

    return {
        "feasible": True,
        "status": "optimal",
        "message": "Solución óptima encontrada.",
        "allocations": rows,
        "totals": {
            "cost": total_cost,
            "productivity": float(-res.fun),
            "demand_covered_pct": 100.0 * (gpt_total + kimi_total) / demand if demand else 0.0,
            "budget_remaining": s.budget - total_cost,
            "gpt": gpt_total,
            "kimi": kimi_total,
            "cost_gpt": sum(r["gpt"] * a.cost[0] for r, a in zip(rows, s.activities)),
            "cost_kimi": sum(r["kimi"] * a.cost[1] for r, a in zip(rows, s.activities)),
        },
        "capacity": {
            "gpt": {"used": gpt_total, "available": s.capacity[0]},
            "kimi": {"used": kimi_total, "available": s.capacity[1]},
        },
        "budget": s.budget,
    }
