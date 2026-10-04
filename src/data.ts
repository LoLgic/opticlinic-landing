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

// pct = % de la demanda asignado a GPT-5.5 (el resto va a Kimi K3). Datos de demostración.
export const ACTIVITIES = [
  { id: "consultas", icon: "🩺", name: "Atención de consultas", short: "Consultas", demand: 10000, pct: 60, lead: "GPT-5.5" },
  { id: "mensajes", icon: "💬", name: "Respuesta de mensajes", short: "Mensajes", demand: 8000, pct: 70, lead: "GPT-5.5" },
  { id: "citas", icon: "📅", name: "Agendamiento de citas", short: "Citas", demand: 4000, pct: 50, lead: "Mixta" },
  { id: "bd", icon: "🗄️", name: "Organización de bases de datos", short: "Bases de datos", demand: 6000, pct: 35, lead: "Kimi K3" },
  { id: "registros", icon: "🗂️", name: "Clasificación de registros", short: "Registros", demand: 5000, pct: 40, lead: "Kimi K3" },
  { id: "reportes", icon: "📄", name: "Generación de reportes", short: "Reportes", demand: 2500, pct: 45, lead: "Mixta" },
  { id: "analisis", icon: "📈", name: "Análisis de información", short: "Análisis", demand: null, pct: 55, lead: "Kimi K3" },
];

// Valores por defecto del escenario académico (editables en el simulador)
export const DEFAULT_COST = { gpt: 0.8, kimi: 0.4 }; // USD por tarea
export const DEFAULT_PROD: Record<string, [number, number]> = { // productividad por tarea [GPT-5.5, Kimi K3]
  consultas: [1.0, 0.7], mensajes: [0.9, 0.8], citas: [0.8, 0.85], bd: [0.7, 1.0], registros: [0.75, 0.95], reportes: [0.85, 0.8],
};

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
  ["Problema", "Distribuir actividades entre GPT-5.5 y Kimi K3 sin asignarlas todas a un único modelo."],
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
