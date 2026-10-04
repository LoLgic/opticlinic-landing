import { BarController, BarElement, CategoryScale, Chart as ChartJS, Legend, LineController, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import type { OptimizeResult } from "../api";
import { ACTIVITIES } from "../data";

ChartJS.register(BarController, BarElement, LineController, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);
// Colores neutros que se leen bien en tema claro y oscuro
ChartJS.defaults.color = "#8A9BB5";
ChartJS.defaults.borderColor = "rgba(138,155,181,.2)";
ChartJS.defaults.font.family = "Inter, system-ui, sans-serif";

const BLUE = "#0B4EA2", CYAN = "#06A8CC", ORANGE = "#F57C00";
const short = (id: string) => ACTIVITIES.find((a) => a.id === id)?.short ?? id;
const n = (v: number) => Math.round(v).toLocaleString("es-CO");

export function DistributionChart({ r }: { r: OptimizeResult }) {
  const rows = r.allocations!;
  return (
    <Bar options={{ indexAxis: "y", maintainAspectRatio: false, scales: { x: { stacked: true, max: 100, ticks: { callback: (v) => `${v}%` } }, y: { stacked: true, grid: { display: false } } },
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10 } }, tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${(c.raw as number).toFixed(0)}% (${n(rows[c.dataIndex][c.datasetIndex === 0 ? "gpt" : "kimi"])} tareas)` } } } }}
      data={{ labels: rows.map((a) => short(a.id)), datasets: [
        { label: "GPT-5.5", data: rows.map((a) => (a.gpt / a.demand) * 100), backgroundColor: BLUE, borderRadius: 4 },
        { label: "Kimi K3", data: rows.map((a) => (a.kimi / a.demand) * 100), backgroundColor: CYAN, borderRadius: 4 }] }} />
  );
}

export function CostChart({ r }: { r: OptimizeResult }) {
  const t = r.totals!;
  return (
    <Chart type="bar" options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { callback: (v) => `$${n(Number(v))}` } }, x: { grid: { display: false } } },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `$${n(c.raw as number)}` } } } }}
      data={{ labels: ["GPT-5.5", "Kimi K3"], datasets: [
        { type: "bar", label: "Costo", data: [t.cost_gpt, t.cost_kimi], backgroundColor: [BLUE, CYAN], borderRadius: 8, maxBarThickness: 70 },
        { type: "line", label: "Presupuesto máximo", data: [r.budget!, r.budget!], borderColor: ORANGE, borderWidth: 2, pointRadius: 0 }] }} />
  );
}

export function CapacityChart({ r }: { r: OptimizeResult }) {
  const c = r.capacity!;
  return (
    <Bar options={{ indexAxis: "y", maintainAspectRatio: false, scales: { x: { stacked: true, ticks: { callback: (v) => n(Number(v)) } }, y: { stacked: true, grid: { display: false } } },
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10 } } } }}
      data={{ labels: ["GPT-5.5", "Kimi K3"], datasets: [
        { label: "Usada", data: [c.gpt.used, c.kimi.used], backgroundColor: [BLUE, CYAN], borderRadius: 4 },
        { label: "Disponible", data: [c.gpt.available - c.gpt.used, c.kimi.available - c.kimi.used], backgroundColor: "rgba(138,155,181,.25)", borderRadius: 4 }] }} />
  );
}

export function SensitivityChart({ r }: { r: OptimizeResult }) {
  const s = r.sensitivity!;
  const cur = s.curve.findIndex((p) => Math.abs(p.budget - s.current_budget) < 0.01);
  return (
    <Chart type="line" options={{ maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
      scales: { x: { grid: { display: false }, title: { display: true, text: "Presupuesto (USD)" } }, y: { title: { display: true, text: "Productividad total" }, ticks: { callback: (v) => n(Number(v)) } } },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `Productividad: ${n(c.raw as number)}` } } } }}
      data={{ labels: s.curve.map((p) => `$${n(p.budget)}`), datasets: [{ type: "line", label: "Productividad", data: s.curve.map((p) => p.productivity),
        borderColor: BLUE, backgroundColor: BLUE, borderWidth: 2, tension: 0.25,
        pointRadius: s.curve.map((_, i) => (i === cur ? 7 : 3)), pointBackgroundColor: s.curve.map((_, i) => (i === cur ? ORANGE : BLUE)) }] }} />
  );
}
