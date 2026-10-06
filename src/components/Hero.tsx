import { ACTIVITIES } from "../data";
import { useLastResult } from "../ResultContext";
import { Demo, SplitBar } from "./ui";

const Kpi = ({ l, v, c }: { l: string; v: string; c: string }) => (
  <div className="rounded-xl bg-chip p-4"><p className="text-[11px] text-muted">{l}</p><p className={`text-2xl font-extrabold ${c}`}>{v}</p></div>
);
const IDS = ["consultas", "mensajes", "citas", "bd", "reportes"];

export default function Hero() {
  const { last } = useLastResult();
  const t = last?.totals, cap = last?.capacity;
  const rows = IDS.map((id) => {
    const a = ACTIVITIES.find((x) => x.id === id)!;
    const r = last?.allocations?.find((x) => x.id === id);
    return { id, short: a.short, pct: r ? Math.round((r.gpt / r.demand) * 100) : a.pct };
  });
  const capUsed = t && cap ? `${Math.round(((t.gpt + t.kimi) / (cap.gpt.available + cap.kimi.available)) * 100)}%` : "78%";
  return (
    <section id="inicio" className="bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight lg:text-6xl">Optimiza la Inteligencia Artificial de tu clínica.</h1>
          <p className="mt-6 max-w-md text-muted">OptiClinic utiliza Programación Lineal y análisis de datos para determinar cómo distribuir las actividades de una clínica entre diferentes modelos de IA.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#simulador" className="btn btn-primary">Probar simulador</a>
            <a href="#problema" className="btn btn-secondary">Conocer el proyecto</a>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-card p-6 shadow-card">
          <div className="mb-5 flex items-center gap-3"><h3 className="text-sm font-bold">Resultado de optimización</h3><Demo>{last ? "Último resultado" : "Datos de demostración"}</Demo></div>
          <div className="grid grid-cols-3 gap-3">
            <Kpi l="Demanda cubierta" v={t ? `${Math.round(t.demand_covered_pct)}%` : "100%"} c="text-ok" />
            <Kpi l="Capacidad usada" v={capUsed} c="text-brand" /><Kpi l="Estado" v="Factible" c="text-ok" />
          </div>
          <div className="mt-5 rounded-2xl bg-chip p-5">
            <p className="mb-4 text-xs font-bold">Distribución GPT-6 Astra vs Kimi K3{last ? "" : " (ejemplo)"}</p>
            <ul className="space-y-6">
              {rows.map((d) => (
                <li key={d.id} className="grid grid-cols-[100px_1fr] items-center gap-4 text-[11px] text-muted">
                  {d.short}<SplitBar pct={d.pct} label={`${d.short}: ${d.pct}% GPT-6 Astra`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
