import { useState } from "react";
import { NAV } from "../data";

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2 font-bold text-lg" aria-label="OptiClinic">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-brand text-white text-lg leading-none">+</span>
      OptiClinic
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Principal">
        <Logo />
        <ul className="hidden gap-7 text-[13px] text-slate-600 lg:flex">
          {NAV.map((i) => (
            <li key={i.href}><a href={i.href} className="hover:text-brand">{i.label}</a></li>
          ))}
        </ul>
        <a href="#simulador" className="btn btn-primary hidden !py-2 lg:inline-flex">Probar simulador</a>
        <button className="lg:hidden" aria-expanded={open} aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>
      {open && (
        <ul className="space-y-3 border-t border-slate-100 bg-white px-6 py-4 text-sm lg:hidden">
          {NAV.map((i) => (
            <li key={i.href}><a href={i.href} onClick={() => setOpen(false)}>{i.label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
