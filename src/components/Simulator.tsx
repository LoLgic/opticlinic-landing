import { useEffect, useState } from "react";
import { ACTIVITIES, DEMO, STAGES } from "../data";
import { Demo, Head, SplitBar } from "./ui";

const fmt = (n: number) => Math.round(n).toLocaleString("es-CO");
const usd = (n: number) => `$${fmt(n)}`;
const FORMULAS = ["Max Z = Σ pij Xij", "Σ cij Xij ≤ Presupuesto", "Xi1 + Xi2 = Demanda i", "Σ Xij ≤ Capacidad j", "Xij ≥ 0"];

export default function Simulator() {
  const acts = ACTIVITIES.filter((a) => a.demand);
  const [demand, setDemand] = useState<Record<string, number>>(Object.fromEntries(acts.map((a) => [a.id, a.demand!])));
  const [budget, setBudget] = useState(25000);
  const [cap, setCap] = useState({ gpt: 24000, kimi: 26000 });
  const [stage, setStage] = useState(-1); // -1 inactivo, 0..5 en curso, 6 completado

  useEffect(() => {
    if (stage < 0 || stage >= STAGES.length) return;
    const t = setTimeout(() => setStage(stage + 1), 650);
    return () => clearTimeout(t);
  }, [stage]);

  // TODO: reemplazar este cálculo de demostración por POST /api/v1/optimize (solver PL en FastAPI)
  const rows = acts.map((a) => {
    const gpt = Math.round((demand[a.id] * a.pct) / 100);
    return { ...a, gpt, kimi: demand[a.id] - gpt, total: demand[a.id] };
  });
  const gptT = rows.reduce((s, r) => s + r.gpt, 0), kimiT = rows.reduce((s, r) => s + r.kimi, 0);
  const cG = gptT * DEMO.cost.gpt, cK = kimiT * DEMO.cost.kimi, cost = cG + cK;
  const prod = gptT * DEMO.prod.gpt + kimiT * DEMO.prod.kimi;
  const feasible = cost <= budget && gptT <= cap.gpt && kimiT <= cap.kimi;
  const done = stage >= STAGES.length;
  const num = (v: string) => Math.max(0, Number(v.replace(/\D/g, "")) || 0);

  return (
    <>
      <section id="simulador" className="bg-surface"><div className="section">
        <Head tag="Simulador" title="Configuración del escenario" text="Introduce demanda, presupuesto, capacidad y productividad. Valores de ejemplo: escenario académico." />
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <form className="card !p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); setStage(0); }}>
            <fieldset><legend className="mb-3 text-sm font-bold">Demanda mensual</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {acts.map((a) => (
                  <label key={a.id} className="text-xs text-muted">{a.short}
                    <input className="input mt-1" inputMode="numeric" value={fmt(demand[a.id])} onChange={(e) => setDemand({ ...demand, [a.id]: num(e.target.value) })} />
                  </label>
                ))}
              </div></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Presupuesto</legend>
              <label className="block text-xs text-muted sm:w-1/2">Presupuesto mensual (USD)
                <input className="input mt-1" inputMode="numeric" value={`$ ${fmt(budget)}`} onChange={(e) => setBudget(num(e.target.value))} /></label></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Capacidad</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted">GPT-5.5 (tareas)<input className="input mt-1" inputMode="numeric" value={fmt(cap.gpt)} onChange={(e) => setCap({ ...cap, gpt: num(e.target.value) })} /></label>
                <label className="text-xs text-muted">Kimi K3 (tareas)<input className="input mt-1" inputMode="numeric" value={fmt(cap.kimi)} onChange={(e) => setCap({ ...cap, kimi: num(e.target.value) })} /></label>
              </div></fieldset>
            <fieldset><legend className="mb-3 text-sm font-bold">Productividad por actividad</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs text-muted">Actividad<select className="input mt-1">{acts.map((a) => <option key={a.id}>{a.short}</option>)}</select></label>
                <label className="text-xs text-muted">GPT-5.5 / Kimi K3<input className="input mt-1" defaultValue="1.0 / 0.9" /></label>
              </div></fieldset>
            <button className="btn btn-primary w-full !py-5" disabled={stage >= 0 && !done}>Ejecutar optimización</button>
          </form>

          <aside className="card h-fit !p-6">
            <span className="inline-block rounded-xl bg-chip px-3 py-2 text-[11px] font-bold text-ok">Estado: {stage < 0 ? "listo para ejecutar" : done ? "optimización completada" : "optimizando…"}</span>
            <h3 className="mb-3 mt-5 text-sm font-bold">Vista previa del modelo</h3>
            <ul className="space-y-3">{FORMULAS.map((f) => <li key={f} className="rounded-xl bg-chip px-4 py-4 text-sm font-bold text-brand">{f}</li>)}</ul>
            <div className="mt-3 rounded-xl bg-chip p-4"><p className="text-sm font-bold">{done ? "Resultados listos" : "Sin resultados todavía"}</p>
              <p className="text-xs text-muted">{done ? "Revisa el dashboard de resultados." : "Pulsa «Ejecutar optimización» para ver la distribución."}</p></div>
          </aside>
        </div>

        {stage >= 0 && (
          <div className="mt-8" aria-live="polite">
            <span className="tag">{done ? "Completado" : "Optimización en curso"}</span>
            <h3 className="mt-4 text-2xl font-extrabold">Analizando {acts.length} actividades…</h3>
            <div className="card mt-4 !p-6">
              <p className="text-xs font-bold text-muted">Progreso: {Math.min(stage, 6)} de 6 etapas</p>
              <div className="my-3 h-1.5 rounded-full bg-chip"><div className="h-full rounded-full bg-cyan2 transition-all" style={{ width: `${(Math.min(stage, 6) / 6) * 100}%` }} /></div>
              <ul className="space-y-3 text-sm">{STAGES.map((s, i) => (
                <li key={s} className={i <= stage ? "font-bold" : "text-muted"}><span className={`mr-3 ${i < stage ? "text-ok" : "text-cyan2"}`}>{i < stage ? "✓" : i === stage ? "●" : "○"}</span>{s}</li>))}</ul>
            </div>
            {done && <p className="mt-4 inline-block rounded-xl bg-ok px-5 py-4 text-sm font-bold text-white">✓ Optimización completada</p>}
          </div>
        )}
      </div></section>

      <section id="resultados" className="section">
        <Head tag="Dashboard de resultados" title="Resultado de optimización" text="Distribución calculada a partir de las restricciones y parámetros establecidos." />
        <div className="mb-5"><Demo>Datos de demostración · Escenario académico</Demo></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {[["Demanda cubierta", "100%", "text-ok"], ["Presupuesto utilizado", usd(cost), ""], ["Productividad total", fmt(prod), ""],
            ["Capacidad utilizada", `${Math.round(((gptT + kimiT) / (cap.gpt + cap.kimi)) * 100)}%`, "text-brand"], ["Costo total", usd(cost), ""],
            ["Estado", feasible ? "Solución factible" : "No factible", feasible ? "text-ok" : "text-warn"]].map(([l, v, c]) => (
            <div key={l} className="card !p-4"><p className="text-[11px] text-muted">{l}</p><p className={`mt-1 text-xl font-extrabold ${c}`}>{v}</p></div>))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="card lg:row-span-2"><h3 className="mb-5 text-sm font-bold">Distribución GPT-5.5 vs Kimi K3 (ejemplo)</h3>
            <ul className="space-y-6">{rows.map((r) => <li key={r.id} className="text-[11px] text-muted"><div className="mb-1 flex justify-between"><span>{r.short}</span><span>{r.pct}% / {100 - r.pct}%</span></div><SplitBar pct={r.pct} label={`${r.short} ${r.pct}% GPT-5.5`} /></li>)}</ul>
            <p className="mt-5 flex gap-4 text-[11px] font-bold"><span className="text-brand">■ GPT-5.5</span><span className="text-cyan2">■ Kimi K3</span></p></div>
          <div className="card"><h3 className="mb-4 text-sm font-bold">Costo por modelo vs presupuesto máximo</h3>
            <div className="relative flex h-40 items-end justify-center gap-10 border-b border-line">
              <div className="absolute inset-x-0 border-t-2 border-warn" style={{ bottom: "85%" }}><span className="text-[10px] font-bold text-warn">Presupuesto máximo</span></div>
              {[[cG, "bg-brand", "GPT-5.5"], [cK, "bg-cyan2", "Kimi K3"]].map(([v, bg, n]) => (
                <div key={String(n)} className="flex flex-col items-center text-[10px] text-muted"><span className="font-bold text-ink">{usd(Number(v))}</span>
                  <div className={`w-16 rounded-t-lg ${bg}`} style={{ height: `${Math.min(100, (Number(v) / budget) * 85 * 1.35)}px` }} /><span className="absolute -bottom-5">{n}</span></div>))}
            </div></div>
          <div className="card"><h3 className="mb-4 text-sm font-bold">Capacidad utilizada</h3>
            {[["GPT-5.5", gptT, cap.gpt, "bg-brand"], ["Kimi K3", kimiT, cap.kimi, "bg-cyan2"]].map(([n, u, c, bg]) => (
              <div key={String(n)} className="mb-4"><p className="text-xs font-bold">{n} · {Math.round((Number(u) / Number(c)) * 100)}% usada</p>
                <div className="my-1 h-2 rounded-full bg-chip"><div className={`h-full rounded-full ${bg}`} style={{ width: `${Math.min(100, (Number(u) / Number(c)) * 100)}%` }} /></div>
                <p className="text-[11px] text-muted">Capacidad disponible: {fmt(Number(c) - Number(u))} tareas</p></div>))}</div>
        </div>
        <div className="card mt-5 overflow-x-auto !p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs text-muted"><tr>{["Actividad", "GPT-5.5", "Kimi K3", "Demanda", "Costo"].map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={r.id} className={i % 2 === 0 ? "bg-chip/60" : ""}><td className="px-5 py-4 font-bold">{r.short}</td><td className="px-5 font-bold">{fmt(r.gpt)}</td><td className="px-5 font-bold">{fmt(r.kimi)}</td>
                <td className="px-5 text-muted">{fmt(r.total)}</td><td className="px-5 text-muted">{usd(r.gpt * DEMO.cost.gpt + r.kimi * DEMO.cost.kimi)}</td></tr>))}</tbody>
          </table></div>
        <div className="mt-5 rounded-2xl bg-chip p-6">
          <span className="text-[11px] font-bold text-ok">Solución encontrada</span>
          <h3 className="mt-2 text-2xl font-extrabold">Distribución óptima</h3>
          <p className="mt-1 font-bold"><span className="mr-6 text-brand">GPT-5.5: {Math.round((gptT / (gptT + kimiT)) * 100)}%</span><span className="text-cyan2">Kimi K3: {Math.round((kimiT / (gptT + kimiT)) * 100)}%</span></p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[["Costo total", usd(cost)], ["Productividad", fmt(prod)], ["Demanda cubierta", "100%"], ["Capacidad utilizada", `${Math.round(((gptT + kimiT) / (cap.gpt + cap.kimi)) * 100)}%`], ["Presupuesto restante", usd(budget - cost)]].map(([l, v]) => (
              <div key={l} className="card !p-4"><p className="text-[11px] text-muted">{l}</p><p className="text-xl font-extrabold">{v}</p></div>))}</div>
        </div>
      </section>
    </>
  );
}
