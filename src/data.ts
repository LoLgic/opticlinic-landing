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

// Datos de demostración: % asignado al modelo A (el resto va al modelo B)
export const DISTRIBUTION = [
  { task: "Consultas", a: 60 },
  { task: "Mensajes", a: 70 },
  { task: "Citas", a: 50 },
  { task: "Bases de datos", a: 30 },
  { task: "Reportes", a: 40 },
];

export const STEPS = [
  { n: "01", title: "Define las actividades", text: "Consultas, mensajes, citas, bases de datos y reportes con su demanda." },
  { n: "02", title: "Configura restricciones", text: "Demanda, presupuesto, capacidad y porcentaje mínimo por modelo." },
  { n: "03", title: "Resuelve el modelo", text: "Un solver de Programación Lineal calcula la asignación óptima." },
  { n: "04", title: "Analiza el informe", text: "Costos, capacidad usada, factibilidad y el modelo matemático generado." },
];

export const MODELS = [
  { name: "GPT-5.5", role: "Razonamiento y atención al paciente" },
  { name: "Kimi K3", role: "Procesamiento masivo de datos y reportes" },
  { name: "Más modelos", role: "Extensible a n modelos de IA" },
];

export const TEAM = [
  { name: "Integrante 1", role: "Modelado matemático" },
  { name: "Integrante 2", role: "Backend y solver" },
  { name: "Integrante 3", role: "Frontend y UX" },
];
