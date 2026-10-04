import type { ReactNode } from "react";

export function Head({ tag, title, text }: { tag: string; title: string; text?: string }) {
  return (
    <div className="mb-10">
      <span className="tag">{tag}</span>
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight lg:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted">{text}</p>}
    </div>
  );
}

export const Arrow = () => <span aria-hidden className="hidden text-xl font-bold text-cyan2 lg:block">→</span>;
export const Demo = ({ children = "Datos de demostración" }: { children?: ReactNode }) => (
  <span className="rounded-full bg-warn/10 px-2.5 py-1 text-[10px] font-semibold text-warn">{children}</span>
);

/** Barra de distribución: azul = GPT-5.5, cian = Kimi K3 */
export function SplitBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="flex h-2 overflow-hidden rounded-full bg-cyan2" role="img" aria-label={label}>
      <div className="bg-brand" style={{ width: `${pct}%` }} />
    </div>
  );
}
