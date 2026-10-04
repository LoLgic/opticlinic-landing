import { MATH, METHOD, PROJECT_CARDS, TEAM } from "../data";
import { Arrow, Head } from "./ui";

export function MathModel() {
  return (
    <section className="bg-surface"><div className="section">
      <Head tag="Modelo matemático" title="El modelo detrás de la decisión" text="Programación Lineal: variables, función objetivo y restricciones." />
      <div className="grid gap-5 md:grid-cols-3">
        {MATH.map(([t, f, d]) => (
          <div key={t} className="card"><p className="text-xs font-bold text-muted">{t}</p><p className="my-3 rounded-xl bg-chip px-4 py-5 text-lg font-extrabold text-brand">{f}</p><p className="text-xs text-muted">{d}</p></div>))}
      </div>
      <div className="card mt-5 !p-6">
        <h3 className="mb-4 text-sm font-bold">Región factible (gráfico conceptual y educativo)</h3>
        <svg viewBox="0 0 560 270" className="max-h-72 w-full" role="img" aria-label="Región factible con restricciones de capacidad y presupuesto y la solución óptima">
          <polygon points="20,110 150,44 317,118 348,242 20,242" className="fill-brand" />
          <line x1="85" y1="242" x2="440" y2="40" stroke="rgb(var(--warn))" strokeWidth="2" />
          <line x1="20" y1="52" x2="420" y2="208" stroke="rgb(var(--cyan))" strokeWidth="2" />
          <circle cx="314" cy="112" r="7" fill="rgb(var(--ok))" />
          <path d="M20 8V242H520" fill="none" stroke="rgb(var(--ink))" strokeWidth="1.5" />
          <g className="fill-muted text-[11px] font-semibold">
            <text x="28" y="14">X2 (Kimi K3)</text><text x="400" y="262">X1 (GPT-5.5)</text>
            <text x="400" y="32" fill="rgb(var(--warn))">Capacidad</text><text x="330" y="102" fill="rgb(var(--ok))">Solución óptima</text>
            <text x="360" y="200" fill="rgb(var(--cyan))">Presupuesto</text>
          </g>
        </svg>
        <p className="text-sm font-bold text-brand">La solución debe encontrarse dentro de las restricciones establecidas.</p>
      </div>
    </div></section>
  );
}

export function Methodology() {
  const flow = ["Usuario", "OptiClinic", "Motor de optimización", "Modelo de PL", "Python", "Resultado"];
  return (
    <section id="metodologia" className="section">
      <Head tag="Metodología" title="Ocho etapas, del problema a la interpretación" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METHOD.map((m, i) => <li key={m} className="card !p-6"><span className="num">0{i + 1}</span><h3 className="mt-2 font-bold">{m}</h3></li>)}
      </ol>
      <div className="card mt-5 !p-6">
        <h3 className="mb-4 text-lg font-extrabold">De la formulación matemática al software</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-white">
          {flow.map((f, i) => <span key={f} className="flex items-center gap-3"><span className={`rounded-xl px-4 py-3 ${i === 5 ? "bg-ok" : "bg-brand"}`}>{f}</span>{i < 5 && <Arrow />}</span>)}
        </div>
        <p className="mt-4 text-xs text-muted">Input → Processing → Optimization → Output</p>
      </div>
    </section>
  );
}

export function Project() {
  return (
    <section id="equipo" className="bg-surface"><div className="section">
      <span className="tag">Proyecto académico</span>
      <h2 className="mt-6 max-w-4xl text-3xl font-extrabold tracking-tight lg:text-4xl">Minimizar costos para la implementación de un agente de IA en una clínica</h2>
      <p className="mt-4 text-muted">Ingeniería de Sistemas · Programación Lineal de Optimización · Montería — 2026</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PROJECT_CARDS.map(([t, d]) => <div key={t} className="card"><h3 className="text-sm font-bold text-brand">{t}</h3><p className="mt-2 text-xs text-muted">{d}</p></div>)}
      </div>
      <h3 className="mb-4 mt-12 text-2xl font-extrabold">Equipo del proyecto</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {TEAM.map((p) => (
          <div key={p.ini} className="card"><span className="grid h-14 w-14 place-items-center rounded-full bg-chip font-bold text-brand">{p.ini}</span>
            <p className="mt-3 text-sm font-bold">{p.name}</p><p className="text-xs text-muted">Integrante · Ingeniería de Sistemas</p></div>))}
      </div>
    </div></section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10">
      <div className="rounded-2xl bg-chip p-8">
        <p className="text-lg font-extrabold">OptiClinic</p>
        <p className="mt-1 text-sm text-muted">Optimización inteligente para decisiones basadas en datos.</p>
        <nav className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-bold text-brand" aria-label="Pie de página">
          {[["Inicio", "#inicio"], ["Simulador", "#simulador"], ["Dashboard", "#resultados"], ["Modelo", "#metodologia"], ["Metodología", "#metodologia"], ["Equipo", "#equipo"]].map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          <a href="mailto:correo@opticlinic.edu.co">correo@opticlinic.edu.co</a><a href="#">LinkedIn</a><a href="#">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
