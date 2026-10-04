import { DISTRIBUTION } from "../data";

function Kpi({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-surface p-4">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ResultCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <h3 className="text-sm font-semibold">Resultado de optimización</h3>
        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-500">Datos de demostración</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Demanda cubierta" value="100%" color="text-ok" />
        <Kpi label="Capacidad usada" value="78%" color="text-brand" />
        <Kpi label="Estado" value="Factible" color="text-ok" />
      </div>
      <div className="mt-5 rounded-xl bg-surface p-5">
        <p className="mb-4 text-xs font-semibold">Distribución GPT-5.5 vs Kimi K3 (ejemplo)</p>
        <ul className="space-y-6">
          {DISTRIBUTION.map((d) => (
            <li key={d.task} className="grid grid-cols-[100px_1fr] items-center gap-4 text-[11px] text-slate-600">
              {d.task}
              <div className="flex h-2 overflow-hidden rounded-full bg-cyan2" role="img" aria-label={`${d.task}: ${d.a}% GPT-5.5, ${100 - d.a}% Kimi K3`}>
                <div className="bg-brand" style={{ width: `${d.a}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-brand">HealthTech · IA · Programación Lineal</span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight lg:text-6xl">
            Optimiza la Inteligencia Artificial de tu clínica.
          </h1>
          <p className="mt-6 max-w-md text-slate-500">
            OptiClinic utiliza Programación Lineal y análisis de datos para determinar cómo distribuir las actividades de una clínica entre diferentes modelos de IA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#simulador" className="btn btn-primary">Probar simulador</a>
            <a href="#problema" className="btn btn-secondary">Conocer el proyecto</a>
          </div>
        </div>
        <ResultCard />
      </div>
    </section>
  );
}
