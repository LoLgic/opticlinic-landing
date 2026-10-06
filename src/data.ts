export const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Problema", href: "#problema" },
  { label: "¿Cómo funciona?", href: "#como-funciona" },
  { label: "Modelos de IA", href: "#modelos" },
  { label: "Simulador", href: "#simulador" },
  { label: "Resultados", href: "#resultados" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Equipo", href: "#equipo" },
];

// pct = % de la demanda asignado a GPT-6 Astra (el resto va a Kimi K3). Datos de demostración.
export const ACTIVITIES = [
  { id: "consultas", icon: "🩺", name: "Atención de consultas", short: "Consultas", demand: 10000, pct: 60, lead: "GPT-6 Astra" },
  { id: "mensajes", icon: "💬", name: "Respuesta de mensajes", short: "Mensajes", demand: 8000, pct: 70, lead: "GPT-6 Astra" },
  { id: "citas", icon: "📅", name: "Agendamiento de citas", short: "Citas", demand: 4000, pct: 50, lead: "Mixta" },
  { id: "bd", icon: "🗄️", name: "Organización de bases de datos", short: "Bases de datos", demand: 6000, pct: 35, lead: "Kimi K3" },
  { id: "registros", icon: "🗂️", name: "Clasificación de registros", short: "Registros", demand: 5000, pct: 40, lead: "Kimi K3" },
  { id: "reportes", icon: "📄", name: "Generación de reportes", short: "Reportes", demand: 2500, pct: 45, lead: "Mixta" },
  { id: "analisis", icon: "📈", name: "Análisis de información", short: "Análisis", demand: 3000, pct: 55, lead: "Kimi K3" },
];

// ───────── Supuestos del escenario académico (se documentan en la sección Metodología) ─────────
// Precios de lista en USD por millón de tokens (verificar en las páginas oficiales de OpenAI y Moonshot).
export const PRICES = { gpt: { in: 10, out: 50 }, kimi: { in: 3, out: 15 } }; // GPT-6 Astra: contexto corto (≤272K tokens)
export type Prices = typeof PRICES;
// Los tokens de razonamiento de Kimi K3 se facturan como salida: se asume 1,5x los tokens de salida visibles.
export const KIMI_OUT_FACTOR = 1.5;
// GPT-6 Astra permite ajustar el esfuerzo de razonamiento (none/low/…); se asume esfuerzo bajo: sin recargo en los tokens de salida.
export const GPT_OUT_FACTOR = 1;
// Tokens estimados por tarea [entrada, salida]
export const TOKENS: Record<string, [number, number]> = {
  consultas: [1200, 400], mensajes: [600, 200], citas: [500, 150], bd: [3000, 1000],
  registros: [1500, 100], reportes: [4000, 1500], analisis: [6000, 1500],
};
export function taskCost(id: string, p: Prices): [number, number] {
  const [ti, to] = TOKENS[id];
  return [(ti * p.gpt.in + to * GPT_OUT_FACTOR * p.gpt.out) / 1e6, (ti * p.kimi.in + to * KIMI_OUT_FACTOR * p.kimi.out) / 1e6];
}
// Productividad por tarea [GPT-6 Astra, Kimi K3]: calidad esperada en escala 0–1 (supuesto razonado, no medido)
export const DEFAULT_PROD: Record<string, [number, number]> = {
  consultas: [0.95, 0.85], mensajes: [0.92, 0.85], citas: [0.9, 0.88], bd: [0.85, 0.92],
  registros: [0.88, 0.92], reportes: [0.9, 0.88], analisis: [0.88, 0.92],
};
export const RATIONALE: Record<string, string> = {
  consultas: "Trato con el paciente: se asume mejor matiz conversacional y seguridad en GPT-6 Astra.",
  mensajes: "Respuestas cortas y empáticas: ventaja moderada de GPT-6 Astra.",
  citas: "Tarea simple y estructurada: ambos modelos rinden casi igual.",
  bd: "Textos largos y datos tabulares: se asume ventaja de Kimi K3 (contexto de 1M tokens y menor costo).",
  registros: "Clasificación repetitiva de alto volumen: Kimi K3 con calidad similar y menor costo.",
  reportes: "Redacción formal: rendimiento parecido, ligera ventaja de GPT-6 Astra.",
  analisis: "Análisis de grandes volúmenes de información: se asume ventaja de Kimi K3 por contexto largo.",
};
export const DEFAULT_BUDGET = 1100;       // USD/mes (hipotético)
export const DEFAULT_CAPACITY = { gpt: 24000, kimi: 26000 }; // tareas/mes (hipotético)
export const avgProd = (j: 0 | 1) => Object.values(DEFAULT_PROD).reduce((s, p) => s + p[j], 0) / Object.keys(DEFAULT_PROD).length;

export const PROBLEM_CHIPS = ["Consultas de pacientes", "Mensajes", "Agendamiento de citas", "Organización de bases de datos", "Clasificación de registros", "Generación de reportes", "Análisis de información"];
export const PROBLEM_STEPS = [
  ["Demanda", "Volumen mensual por actividad"], ["Recursos limitados", "Presupuesto y tiempo finitos"],
  ["Costos", "Cada IA cobra distinto"], ["Capacidades diferentes", "Rendimiento según la tarea"],
  ["Necesidad de optimización", "Decidir la mejor distribución"],
];
export const HOW_STEPS = [
  ["Ingresar datos", "Demanda, costos, capacidad, presupuesto y productividad."],
  ["Definir variables", "Cantidad de trabajo asignada a cada IA."],
  ["Aplicar restricciones", "Demanda, presupuesto, capacidad y no negatividad."],
  ["Ejecutar optimización", "El algoritmo analiza las combinaciones posibles."],
  ["Obtener solución", "Distribución óptima y métricas."],
];
export const MODEL_ROWS = ["Productividad", "Costo", "Capacidad", "Tiempo", "Actividades asignadas"];
export const STAGES = ["Validando datos", "Verificando restricciones", "Construyendo modelo", "Ejecutando optimización", "Calculando solución", "Generando resultados"];
export const MATH = [
  ["Variables de decisión", "Xij", "Cantidad de trabajo asignada a cada combinación de actividad y modelo."],
  ["Función objetivo", "Max Z = Σ pij Xij", "Maximiza la productividad total de la clínica."],
  ["Restricción de presupuesto", "Σ cij Xij ≤ B", "El costo total no supera el presupuesto disponible."],
  ["Restricción de demanda", "Xi1 + Xi2 = Demanda i", "Entre ambos modelos se atiende toda la demanda."],
  ["Restricción de capacidad", "Σ Xij ≤ Capacidad j", "Ningún modelo supera su capacidad de procesamiento."],
  ["No negatividad", "Xij ≥ 0", "No existen cantidades negativas de trabajo."],
];
export const METHOD = ["Definición del problema", "Identificación de variables", "Recolección de parámetros", "Formulación matemática", "Definición de restricciones", "Implementación en Python", "Optimización", "Interpretación de resultados"];
export const PROJECT_CARDS = [
  ["Problema", "Distribuir actividades entre GPT-6 Astra y Kimi K3 sin asignarlas todas a un único modelo."],
  ["Pregunta central", "¿Cómo distribuir de forma óptima las actividades considerando productividad, capacidad y costos?"],
  ["Objetivo", "Encontrar una asignación óptima mediante Programación Lineal."],
  ["Contexto", "Clínica u hospital: atención al paciente y gestión de información."],
  ["Propuesta", "Modelo con variables, restricciones, región factible y solución óptima, implementado en Python."],
  ["Resultado esperado", "Distribución determinada por el modelo, no definida previamente."],
];
export const TEAM = [
  { ini: "MA", name: "Mario Andres Petro Galarcio" },
  { ini: "OD", name: "Omar David Peña Siciliano" },
  { ini: "LC", name: "Luis Carlos Cardenas Medina" },
];
