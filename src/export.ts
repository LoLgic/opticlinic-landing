import type { OptimizeResult } from "./api";
import { ACTIVITIES } from "./data";

// Formato pensado para Excel en español: separador ";" y coma decimal, con BOM para las tildes.
const num = (n: number, d = 2) => n.toFixed(d).replace(".", ",");

export function downloadCsv(r: OptimizeResult) {
  if (!r.feasible || !r.allocations || !r.totals || !r.capacity) return;
  const t = r.totals, s = r.sensitivity;
  const rows: (string | number)[][] = [
    ["OptiClinic - Informe de optimizacion"], [],
    ["Actividad", "GPT-6 Astra (tareas)", "Kimi K3 (tareas)", "Demanda", "Costo (USD)"],
    ...r.allocations.map((a) => [ACTIVITIES.find((x) => x.id === a.id)?.short ?? a.id, num(a.gpt, 0), num(a.kimi, 0), num(a.demand, 0), num(a.cost)]),
    [], ["Resumen"],
    ["Costo total (USD)", num(t.cost)], ["Presupuesto (USD)", num(r.budget ?? 0)], ["Presupuesto restante (USD)", num(t.budget_remaining)],
    ["Productividad total", num(t.productivity)], ["Demanda cubierta (%)", num(t.demand_covered_pct, 1)],
    ["Capacidad usada GPT-6 Astra", `${num(r.capacity.gpt.used, 0)} de ${num(r.capacity.gpt.available, 0)}`],
    ["Capacidad usada Kimi K3", `${num(r.capacity.kimi.used, 0)} de ${num(r.capacity.kimi.available, 0)}`],
  ];
  if (s) rows.push([], ["Sensibilidad (aumento de productividad por unidad adicional)"],
    ["Presupuesto (por USD)", num(s.shadow.budget, 4)], ["Capacidad GPT-6 Astra (por tarea)", num(s.shadow.capacity_gpt, 4)], ["Capacidad Kimi K3 (por tarea)", num(s.shadow.capacity_kimi, 4)],
    [], ["Presupuesto (USD)", "Productividad optima"], ...s.curve.map((p) => [num(p.budget), num(p.productivity)]));

  const csv = "\ufeff" + rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = `opticlinic-informe-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
