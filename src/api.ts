export interface Allocation { id: string; demand: number; gpt: number; kimi: number; cost: number }
export interface OptimizeResult {
  feasible: boolean; status: string; message: string;
  allocations?: Allocation[];
  totals?: { cost: number; productivity: number; demand_covered_pct: number; budget_remaining: number; gpt: number; kimi: number; cost_gpt: number; cost_kimi: number };
  capacity?: { gpt: { used: number; available: number }; kimi: { used: number; available: number } };
  budget?: number;
}
export interface OptimizeRequest {
  activities: { id: string; demand: number; prod_gpt: number; prod_kimi: number; cost_gpt: number; cost_kimi: number }[];
  budget: number; capacity_gpt: number; capacity_kimi: number;
}

const BASE = import.meta.env.VITE_API_URL ?? ""; // vacío => usa el proxy de Vite (/api -> :8000)

export async function optimize(body: OptimizeRequest, signal?: AbortSignal): Promise<OptimizeResult> {
  const res = await fetch(`${BASE}/api/v1/optimize`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal,
  });
  if (!res.ok) throw new Error(res.status === 422 ? "Revisa los valores ingresados (deben ser mayores a 0)." : `Error del servidor (${res.status}).`);
  return res.json();
}
