import pytest
from app.solver import Activity, Scenario, solve

ACTS = [
    Activity("a", 100, (1.0, 0.5), (0.8, 0.4)),
    Activity("b", 100, (0.5, 1.0), (0.8, 0.4)),
]


def test_asigna_cada_actividad_al_modelo_mas_productivo():
    r = solve(Scenario(ACTS, budget=1000, capacity=(1000, 1000)))
    assert r["feasible"]
    a, b = r["allocations"]
    assert a["gpt"] == pytest.approx(100) and b["kimi"] == pytest.approx(100)


def test_demanda_siempre_cubierta():
    r = solve(Scenario(ACTS, budget=1000, capacity=(1000, 1000)))
    for row in r["allocations"]:
        assert row["gpt"] + row["kimi"] == pytest.approx(row["demand"])


def test_capacidad_obliga_a_repartir():
    r = solve(Scenario(ACTS, budget=1000, capacity=(50, 1000)))
    assert r["capacity"]["gpt"]["used"] <= 50 + 1e-6


def test_infactible_por_presupuesto():
    r = solve(Scenario(ACTS, budget=10, capacity=(1000, 1000)))
    assert not r["feasible"] and r["status"] == "infeasible"
