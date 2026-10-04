import { ACTIVITIES, DEFAULT_CAPACITY, HOW_STEPS, MODEL_ROWS, PRICES, PROBLEM_CHIPS, PROBLEM_STEPS, avgProd } from "../data";
import { Arrow, Demo, Head, SplitBar } from "./ui";

export function Problem() {
  return (
    <section id="problema" className="bg-surface"><div className="section">
      <Head tag="El problema" title="¿Cómo decidir qué IA utilizar para cada actividad?" text="Una clínica tiene actividades con necesidades distintas: ningún modelo es mejor para todas." />
      <ul className="mb-8 flex flex-wrap gap-3">{PROBLEM_CHIPS.map((c) => <li key={c} className="rounded-xl border border-line bg-chip px-4 py-2 text-xs font-bold">{c}</li>)}</ul>
      <ol className="mb-8 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
        {PROBLEM_STEPS.flatMap(([t, d], i) => [
          <li key={t} className="card h-full"><span className="text-xs font-bold text-cyan2">0{i + 1}</span><h3 className="mt-2 font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li>,
          i < 4 ? <Arrow key={`a${i}`} /> : null,
        ])}
      </ol>
      <p className="callout">El proyecto no asume que un único modelo sea mejor para todas las actividades: el modelo matemático decide la distribución.</p>
    </div></section>
  );
}

export function How() {
  return (
    <section id="como-funciona" className="bg-surface"><div className="section pt-0">
      <Head tag="¿Cómo funciona?" title="Cinco pasos, de los datos a la solución" text="Del ingreso de parámetros a la distribución óptima." />
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {HOW_STEPS.map(([t, d], i) => <li key={t} className="card"><span className="num">0{i + 1}</span><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></li>)}
      </ol>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-white">
        {["Datos", "Modelo", "Optimización", "Resultado"].map((s, i) => (
          <span key={s} className="flex items-center gap-3"><span className={`rounded-xl px-6 py-5 ${i === 3 ? "bg-ok" : "bg-brand"}`}>{s}</span>{i < 3 && <span className="text-cyan2">→</span>}</span>
        ))}
      </div>
    </div></section>
  );
}

const facts = (j: 0 | 1): Record<string, string> => {
  const p = j === 0 ? PRICES.gpt : PRICES.kimi;
  return {
    Productividad: avgProd(j).toFixed(2),
    Costo: `$${p.in} / $${p.out} por M tokens`,
    Capacidad: `${(j === 0 ? DEFAULT_CAPACITY.gpt : DEFAULT_CAPACITY.kimi).toLocaleString("es-CO")} tareas/mes`,
    Tiempo: "Por medir",
    "Actividades asignadas": "Las define el solver",
  };
};

export function Models() {
  return (
    <section id="modelos" className="section">
      <Head tag="Modelos de IA" title="GPT-5.5 y Kimi K3" text="Cada modelo aporta condiciones distintas según la actividad." />
      <div className="grid gap-5 md:grid-cols-2">
        {[["GPT-5.5", "bg-brand", 0], ["Kimi K3", "bg-cyan2", 1]].map(([n, bg, j]) => (
          <article key={n} className="card !p-6">
            <header className="mb-6 flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-bold text-white ${bg}`}>AI</span><h3 className="text-2xl font-extrabold">{n}</h3><Demo>Supuestos</Demo></header>
            <dl className="divide-y divide-line">{MODEL_ROWS.map((r) => <div key={r} className="flex justify-between py-4 text-sm"><dt className="text-muted">{r}</dt><dd className="font-extrabold">{facts(j as 0 | 1)[r]}</dd></div>)}</dl>
          </article>
        ))}
      </div>
      <p className="callout mt-5 text-center">La optimización determina la distribución.</p>
    </section>
  );
}

export function Activities() {
  return (
    <section className="bg-surface"><div className="section">
      <Head tag="Actividades" title="Siete actividades, una distribución óptima" text="Escenario académico · porcentajes de ejemplo." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIVITIES.map((a) => (
          <article key={a.id} className="card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-chip text-lg">{a.icon}</span>
            <h3 className="mt-4 font-bold">{a.name}</h3>
            <p className="mt-2 text-xs text-muted">Demanda: {a.demand ? a.demand.toLocaleString("es-CO") : "Por definir"}</p>
            <p className={`mt-1 text-xs font-bold ${a.lead === "Kimi K3" ? "text-cyan2" : "text-brand"}`}>IA principal (demo): {a.lead}</p>
            <div className="my-2"><SplitBar pct={a.pct} label={`${a.pct}% GPT-5.5`} /></div>
            <p className="text-[11px] text-muted">{a.pct}% GPT-5.5 / {100 - a.pct}% Kimi K3</p>
          </article>
        ))}
      </div>
    </div></section>
  );
}
