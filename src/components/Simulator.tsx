import { useEffect, useRef, useState } from "react";
import { optimize, type OptimizeResult } from "../api";
import { ACTIVITIES, DEFAULT_COST, DEFAULT_PROD, STAGES } from "../data";
import { CapacityChart, CostChart, DistributionChart } from "./Charts";
import { Demo, Head } from "./ui";

const fmt = (n: number) => Math.round(n).toLocaleString("es-CO");
const usd = (n: number) => `$${fmt(n)}`;
const dec = (v: string) => { const x = parseFloat(v.replace(",", ".")); return Number.isFinite(x) && x >= 0 ? x : 0; };
const num = (v: string) => Math.max(0, Number(v.replace(/\D/g, "")) || 0);
const FORMULAS = ["Max Z = Σ pij Xij", "Σ cij Xij ≤ Presupuesto", "Xi1 + Xi2 = Demanda i", "Σ Xij ≤ Capacidad j", "Xij ≥ 0"];
const LAST = STAGES.length; // 6 = completado

export default function Simulator() {
  const acts = ACTIVITIES.filter((a) => a.demand);
  const [demand, setDemand] = useState<Record<string, number>>(Object.fromEntries(acts.map((a) => [a.id, a.demand!])));
  const [budget, setBudget] = useState(25000);
  const [cap, setCap] = useState({ gpt: 24000, kimi: 26000 });
  const [cost, setCost] = useState(DEFAULT_COST);
  const [prod, setProd] = useState<Record<string, [number, number]>>(DEFAULT_PROD);
  const [sel, setSel] = useState(acts[0].id);
  const [stage, setStage] = useState(-1); // -1 inactivo · 0..5 en curso · 6 completado
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);

  // Animación de etapas: avanza hasta la 5; la última espera a la respuesta del API
  useEffect(() => {
    if (stage < 0 || stage >= LAST) return;
    if (stage === LAST - 1) { if (result) setStage(LAST); return; }
    const t = setTimeout(() => setStage(stage + 1), 450);
    return () => clearTimeout(t);
  }, [stage, result]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    abort.current?.abort();
    abort.current = new AbortController();
    setResult(null); setError(null); setStage(0);
    try {
      const r = await optimize({
        activities: acts.map((a) => ({ id: a.id, demand: demand[a.id], prod_gpt: prod[a.id][0], prod_kimi: prod[a.id][1], cost_gpt: cost.gpt, cost_kimi: cost.kimi })),
        budget, capacity_gpt: cap.gpt, capacity_kimi: cap.kimi,
      }, abort.current.signal);
      setResult(r);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setStage(-1);
      setError(err instanceof TypeError ? "No se pudo conectar con el servidor. ¿Está corriendo FastAPI en el puerto 8000?" : (err as Error).message);
    }
  }

  const done = stage >= LAST && result;
  const ok = done && result.feasible ? result : null;
  const t = ok?.totals;
  const capPct = ok ? Math.round(((t!.gpt + t!.kimi) / (cap.gpt + cap.kimi)) * 100) : 0;
  const status = error ? "error de conexión" : stage < 0 ? "listo para ejecutar" : !done ? "optimizando…" : result.feasible ? "optimización completada" : "escenario infactible";

  return (
    <>
      <section id="simulador" className="bg-surface"><div className="section">
        <Head tag="Simulador" title="Configuración del escenario" text="Introduce demanda, presupuesto, capacidad y productividad. Valores de ejemplo: escenario académico." />
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <form className="card space-y-6 !p-6" onSubmit={run}>
            <fieldset><legend className="mb-3 text-sm font-bold">Demanda mensual</legend>
              <div className="grid gap-4 sm:grid-cols-2">{acts.map((a) => (
                <label key={a.id} className="text-xs text-muted">{a.short}
                  <input className="input mt-1" inputMode="numeric" value={fmt(demand[a.id])} onChange={(e) => setDemand({ ...demand, [a.id]: num(e.target.value) })} /></label>))}</div></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Presupuesto</legend>
              <label className="block text-xs text-muted sm:w-1/2">Presupuesto mensual (USD)
                <input className="input mt-1" inputMode="numeric" value={`$ ${fmt(budget)}`} onChange={(e) => setBudget(num(e.target.value))} /></label></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Capacidad</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted">GPT-5.5 (tareas)<input className="input mt-1" inputMode="numeric" value={fmt(cap.gpt)} onChange={(e) => setCap({ ...cap, gpt: num(e.target.value) })} /></label>
                <label className="text-xs text-muted">Kimi K3 (tareas)<input className="input mt-1" inputMode="numeric" value={fmt(cap.kimi)} onChange={(e) => setCap({ ...cap, kimi: num(e.target.value) })} /></label></div></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Costo por tarea (USD)</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted">GPT-5.5<input className="input mt-1" inputMode="decimal" defaultValue={cost.gpt} onChange={(e) => setCost({ ...cost, gpt: dec(e.target.value) })} /></label>
                <label className="text-xs text-muted">Kimi K3<input className="input mt-1" inputMode="decimal" defaultValue={cost.kimi} onChange={(e) => setCost({ ...cost, kimi: dec(e.target.value) })} /></label></div></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Productividad por actividad</legend>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="text-xs text-muted">Actividad<select className="input mt-1" value={sel} onChange={(e) => setSel(e.target.value)}>{acts.map((a) => <option key={a.id} value={a.id}>{a.short}</option>)}</select></label>
                <label className="text-xs text-muted">GPT-5.5<input key={sel + "g"} className="input mt-1" inputMode="decimal" defaultValue={prod[sel][0]} onChange={(e) => setProd({ ...prod, [sel]: [dec(e.target.value), prod[sel][1]] })} /></label>
                <label className="text-xs text-muted">Kimi K3<input key={sel + "k"} className="input mt-1" inputMode="decimal" defaultValue={prod[sel][1]} onChange={(e) => setProd({ ...prod, [sel]: [prod[sel][0], dec(e.target.value)] })} /></label></div></fieldset>
            <button className="btn btn-primary w-full !py-5" disabled={stage >= 0 && !done}>{stage >= 0 && !done ? "Optimizando…" : "Ejecutar optimización"}</button>
            {error && <p role="alert" className="rounded-xl bg-warn/10 px-4 py-3 text-sm font-semibold text-warn">{error}</p>}
          </form>

          <aside className="card h-fit !p-6">
            <span className="inline-block rounded-xl bg-chip px-3 py-2 text-[11px] font-bold text-ok">Estado: {status}</span>
            <h3 className="mb-3 mt-5 text-sm font-bold">Vista previa del modelo</h3>
            <ul className="space-y-3">{FORMULAS.map((f) => <li key={f} className="rounded-xl bg-chip px-4 py-4 text-sm font-bold text-brand">{f}</li>)}</ul>
            <div className="mt-3 rounded-xl bg-chip p-4"><p className="text-sm font-bold">{done ? (result.feasible ? "Resultados listos" : "Sin solución factible") : "Sin resultados todavía"}</p>
              <p className="text-xs text-muted">{done ? (result.feasible ? "Revisa el dashboard de resultados." : result.message) : "Pulsa «Ejecutar optimización» para ver la distribución."}</p></div>
          </aside>
        </div>

        {stage >= 0 && (
          <div className="mt-8" aria-live="polite">
            <span className="tag">{done ? "Completado" : "Optimización en curso"}</span>
            <h3 className="mt-4 text-2xl font-extrabold">Analizando {acts.length} actividades…</h3>
            <div className="card mt-4 !p-6">
              <p className="text-xs font-bold text-muted">Progreso: {Math.min(stage, LAST)} de {LAST} etapas</p>
              <div className="my-3 h-1.5 rounded-full bg-chip"><div className="h-full rounded-full bg-cyan2 transition-all" style={{ width: `${(Math.min(stage, LAST) / LAST) * 100}%` }} /></div>
              <ul className="space-y-3 text-sm">{STAGES.map((s, i) => (
                <li key={s} className={i <= stage ? "font-bold" : "text-muted"}><span className={`mr-3 ${i < stage ? "text-ok" : "text-cyan2"}`}>{i < stage ? "✓" : i === stage ? "●" : "○"}</span>{s}</li>))}</ul>
            </div>
            {done && <p className={`mt-4 inline-block rounded-xl px-5 py-4 text-sm font-bold text-white ${result.feasible ? "bg-ok" : "bg-warn"}`}>{result.feasible ? "✓ Optimización completada" : `✕ ${result.message}`}</p>}
          </div>
        )}
      </div></section>

      <section id="resultados" className="section">
        <Head tag="Dashboard de resultados" title="Resultado de optimización" text="Distribución calculada por el solver de Programación Lineal a partir de las restricciones y parámetros establecidos." />
        {!ok ? (
          <div className="card text-center text-sm text-muted">Ejecuta la optimización en el simulador para ver aquí la distribución, los costos y la capacidad utilizada.</div>
        ) : (
          <>
            <div className="mb-5"><Demo>Escenario académico · parámetros editables</Demo></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {[["Demanda cubierta", `${Math.round(t!.demand_covered_pct)}%`, "text-ok"], ["Presupuesto utilizado", usd(t!.cost), ""], ["Productividad total", fmt(t!.productivity), ""],
                ["Capacidad utilizada", `${capPct}%`, "text-brand"], ["Costo total", usd(t!.cost), ""], ["Estado", "Solución factible", "text-ok"]].map(([l, v, c]) => (
                <div key={l} className="card !p-4"><p className="text-[11px] text-muted">{l}</p><p className={`mt-1 text-xl font-extrabold ${c}`}>{v}</p></div>))}
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <div className="card lg:row-span-2"><h3 className="mb-4 text-sm font-bold">Distribución GPT-5.5 vs Kimi K3</h3><DistributionChart r={ok} /></div>
              <div className="card"><h3 className="mb-4 text-sm font-bold">Costo por modelo vs presupuesto máximo</h3><CostChart r={ok} /></div>
              <div className="card"><h3 className="mb-4 text-sm font-bold">Capacidad utilizada</h3><CapacityChart r={ok} />
                <p className="mt-3 text-[11px] text-muted">GPT-5.5 · {Math.round((ok.capacity!.gpt.used / ok.capacity!.gpt.available) * 100)}% usada · Kimi K3 · {Math.round((ok.capacity!.kimi.used / ok.capacity!.kimi.available) * 100)}% usada</p></div>
            </div>
            <div className="card mt-5 overflow-x-auto !p-0">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs text-muted"><tr>{["Actividad", "GPT-5.5", "Kimi K3", "Demanda", "Costo"].map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
                <tbody>{ok.allocations!.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? "bg-chip/60" : ""}><td className="px-5 py-4 font-bold">{ACTIVITIES.find((a) => a.id === r.id)?.short}</td><td className="px-5 font-bold">{fmt(r.gpt)}</td><td className="px-5 font-bold">{fmt(r.kimi)}</td>
                    <td className="px-5 text-muted">{fmt(r.demand)}</td><td className="px-5 text-muted">{usd(r.cost)}</td></tr>))}</tbody>
              </table></div>
            <div className="mt-5 rounded-2xl bg-chip p-6">
              <span className="text-[11px] font-bold text-ok">Solución encontrada</span>
              <h3 className="mt-2 text-2xl font-extrabold">Distribución óptima</h3>
              <p className="mt-1 font-bold"><span className="mr-6 text-brand">GPT-5.5: {Math.round((t!.gpt / (t!.gpt + t!.kimi)) * 100)}%</span><span className="text-cyan2">Kimi K3: {Math.round((t!.kimi / (t!.gpt + t!.kimi)) * 100)}%</span></p>
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
                {[["Costo total", usd(t!.cost)], ["Productividad", fmt(t!.productivity)], ["Demanda cubierta", `${Math.round(t!.demand_covered_pct)}%`], ["Capacidad utilizada", `${capPct}%`], ["Presupuesto restante", usd(t!.budget_remaining)]].map(([l, v]) => (
                  <div key={l} className="card !p-4"><p className="text-[11px] text-muted">{l}</p><p className="text-xl font-extrabold">{v}</p></div>))}</div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
