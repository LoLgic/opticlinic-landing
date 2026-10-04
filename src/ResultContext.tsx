import { createContext, useContext, useState, type ReactNode } from "react";
import type { OptimizeResult } from "./api";

/** Último resultado factible del solver, compartido por Hero, Actividades y Simulador. */
const Ctx = createContext<{ last: OptimizeResult | null; setLast: (r: OptimizeResult | null) => void }>({ last: null, setLast: () => {} });

export function ResultProvider({ children }: { children: ReactNode }) {
  const [last, setLast] = useState<OptimizeResult | null>(null);
  return <Ctx.Provider value={{ last, setLast }}>{children}</Ctx.Provider>;
}
export const useLastResult = () => useContext(Ctx);
