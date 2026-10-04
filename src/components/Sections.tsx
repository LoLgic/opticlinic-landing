import { MODELS, STEPS, TEAM } from "../data";

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-slate-500">{text}</p>}
    </div>
  );
}

export function Problem() {
  return (
    <section id="problema" className="section">
      <Heading eyebrow="Problema" title="Elegir qué IA usa cada área es una decisión de costo y capacidad."
        text="Las clínicas adoptan múltiples modelos sin un criterio cuantitativo. El resultado: sobrecostos, capacidad desaprovechada y demanda sin cubrir." />
      <div className="grid gap-4 md:grid-cols-3">
        {["Costos impredecibles", "Capacidad subutilizada", "Decisiones sin datos"].map((t) => (
          <div key={t} className="rounded-xl border border-slate-100 p-6 font-semibold shadow-sm">{t}</div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-surface">
      <div className="section">
        <Heading eyebrow="¿Cómo funciona?" title="De los datos a la asignación óptima en cuatro pasos." />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-xl bg-white p-6 shadow-sm">
              <span className="text-sm font-bold text-cyan2">{s.n}</span>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Models() {
  return (
    <section id="modelos" className="section">
      <Heading eyebrow="Modelos de IA" title="Compara y combina modelos según su costo y capacidad." />
      <div className="grid gap-4 md:grid-cols-3">
        {MODELS.map((m) => (
          <div key={m.name} className="rounded-xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand">{m.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Simulator() {
  return (
    <section id="simulador" className="bg-navy text-white">
      <div className="section text-center">
        <p className="eyebrow !text-cyan2">Simulador</p>
        <h2 className="mt-2 text-3xl font-bold lg:text-4xl">Prueba tu propio escenario</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">Ingresa demanda, costos y restricciones. El solver devuelve la asignación óptima.</p>
        {/* TODO: reemplazar por el formulario conectado a POST /api/v1/optimize */}
        <a href="/app" className="btn btn-primary mt-8">Abrir simulador</a>
      </div>
    </section>
  );
}

export function Results() {
  return (
    <section id="resultados" className="section">
      <Heading eyebrow="Resultados" title="Informes claros y accionables." />
      <div className="grid gap-4 md:grid-cols-3">
        {[["100%", "Demanda cubierta"], ["78%", "Capacidad usada"], ["Factible", "Estado del modelo"]].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-surface p-6">
            <p className="text-3xl font-extrabold text-brand">{v}</p>
            <p className="mt-1 text-sm text-slate-500">{l} · datos de demostración</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Methodology() {
  return (
    <section id="metodologia" className="bg-surface">
      <div className="section">
        <Heading eyebrow="Metodología" title="Programación Lineal con transparencia matemática."
          text="Minimizamos el costo total sujeto a restricciones de demanda, presupuesto, capacidad y porcentaje mínimo por modelo." />
        <pre className="overflow-x-auto rounded-xl bg-navy p-6 text-sm text-cyan-100">{`min  Σ cᵢⱼ · xᵢⱼ
s.a. Σⱼ xᵢⱼ ≥ dᵢ        (demanda)
     Σᵢ xᵢⱼ ≤ Kⱼ        (capacidad)
     Σ cᵢⱼ · xᵢⱼ ≤ B    (presupuesto)
     xᵢⱼ ≥ 0`}</pre>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="equipo" className="section">
      <Heading eyebrow="Equipo" title="Las personas detrás de OptiClinic." />
      <div className="grid gap-4 md:grid-cols-3">
        {TEAM.map((p) => (
          <div key={p.name} className="rounded-xl border border-slate-100 p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-surface text-xl font-bold text-brand">{p.name[0]}</div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-slate-500">{p.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} OptiClinic. Todos los derechos reservados.
    </footer>
  );
}
