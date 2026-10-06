import { describe, expect, it } from "vitest";
import { ACTIVITIES, DEFAULT_PROD, PRICES, TOKENS, avgProd, taskCost } from "./data";

describe("parámetros del escenario", () => {
  it("calcula el costo por tarea con precios por millón de tokens", () => {
    const [gpt, kimi] = taskCost("consultas", PRICES); // 1200 ent. / 400 sal.
    expect(gpt).toBeCloseTo(0.032, 6); // GPT-6 Astra: 1200 x $10/M + 400 x $50/M
    expect(kimi).toBeCloseTo(0.0126, 6); // salida de Kimi x1,5 por tokens de razonamiento
  });

  it("toda actividad con demanda tiene tokens y productividad definidos", () => {
    for (const a of ACTIVITIES.filter((x) => x.demand)) {
      expect(TOKENS[a.id], a.id).toBeDefined();
      expect(DEFAULT_PROD[a.id], a.id).toBeDefined();
    }
  });

  it("la productividad está en escala 0–1", () => {
    for (const [g, k] of Object.values(DEFAULT_PROD)) {
      expect(g).toBeGreaterThan(0); expect(g).toBeLessThanOrEqual(1);
      expect(k).toBeGreaterThan(0); expect(k).toBeLessThanOrEqual(1);
    }
    expect(avgProd(0)).toBeGreaterThan(0);
  });
});
