import { ACTIVITIES, DEFAULT_BUDGET, DEFAULT_CAPACITY, DEFAULT_PROD, KIMI_OUT_FACTOR, PRICES, RATIONALE, TOKENS, taskCost } from "../data";
import { Head } from "./ui";

const usd4 = (n: number) => `$${n.toFixed(4)}`;

export default function Assumptions() {
  return (
    <section className="bg-surface"><div className="section">
      <Head tag="Supuestos del modelo" title="De dónde salen los parámetros"
        text="Los precios son de lista; los tokens y la productividad son supuestos razonados del escenario académico, no mediciones." />
      <div className="card overflow-x-auto !p-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs text-muted"><tr>{["Actividad", "Tokens (ent. / sal.)", "Costo GPT-5.5", "Costo Kimi K3", "Productividad (GPT / Kimi)", "Justificación"].map((h) => <th key={h} className="px-4 py-4 font-bold">{h}</th>)}</tr></thead>
          <tbody>{ACTIVITIES.map((a, i) => {
            const [cg, ck] = taskCost(a.id, PRICES), [pg, pk] = DEFAULT_PROD[a.id];
            return (
              <tr key={a.id} className={i % 2 === 0 ? "bg-chip/60" : ""}>
                <td className="px-4 py-3 font-bold">{a.short}</td><td className="px-4">{TOKENS[a.id][0].toLocaleString("es-CO")} / {TOKENS[a.id][1].toLocaleString("es-CO")}</td>
                <td className="px-4">{usd4(cg)}</td><td className="px-4">{usd4(ck)}</td><td className="px-4 font-bold">{pg.toFixed(2)} / {pk.toFixed(2)}</td>
                <td className="px-4 py-3 text-xs text-muted">{RATIONALE[a.id]}</td>
              </tr>);
          })}</tbody>
        </table>
      </div>
      <ul className="mt-6 grid list-disc gap-3 pl-5 text-sm text-muted md:grid-cols-2">
        <li><b className="text-ink">Precios:</b> GPT-5.5 ${PRICES.gpt.in} entrada / ${PRICES.gpt.out} salida y Kimi K3 ${PRICES.kimi.in} / ${PRICES.kimi.out} por millón de tokens (precios de lista consultados en octubre de 2026; verificar en las páginas oficiales de OpenAI y Moonshot AI).</li>
        <li><b className="text-ink">Costo por tarea</b> = (tokens de entrada × precio de entrada + tokens de salida × precio de salida) / 1.000.000.</li>
        <li><b className="text-ink">Razonamiento de Kimi K3:</b> sus tokens de razonamiento se facturan como salida, por eso se asume {KIMI_OUT_FACTOR}× los tokens de salida visibles.</li>
        <li><b className="text-ink">Tokens por tarea:</b> estimaciones según el tipo de actividad (contexto del paciente o registro + respuesta); no fueron medidos.</li>
        <li><b className="text-ink">Productividad:</b> calidad esperada por tarea en escala 0–1, asignada por criterio razonado de los autores; es el supuesto con mayor incertidumbre.</li>
        <li><b className="text-ink">Demanda, presupuesto y capacidad:</b> hipotéticos (demanda mensual del PDF, presupuesto de ${DEFAULT_BUDGET} USD y capacidad de {DEFAULT_CAPACITY.gpt.toLocaleString("es-CO")} y {DEFAULT_CAPACITY.kimi.toLocaleString("es-CO")} tareas/mes).</li>
      </ul>
      <p className="callout mt-6">Limitación: los resultados dependen de estos supuestos. Una mejora futura es medir tokens, latencia y calidad con un conjunto de tareas de prueba.</p>
    </div></section>
  );
}
