import { useEffect, useState } from "react";
import { NAV } from "../data";

export const Logo = () => (
  <a href="#inicio" className="flex items-center gap-2 text-lg font-bold" aria-label="OptiClinic">
    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-lg leading-none text-white">+</span>
    OptiClinic
  </a>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6" aria-label="Principal">
        <Logo />
        <ul className="hidden gap-6 text-[13px] text-muted xl:flex">
          {NAV.map((i) => <li key={i.href}><a href={i.href} className="hover:text-brand">{i.label}</a></li>)}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)} aria-label="Cambiar tema" className="rounded-full bg-chip px-3 py-1.5 text-xs">☀ / ☾</button>
          <a href="#simulador" className="btn btn-primary hidden !px-4 !py-2 sm:inline-flex">Abrir simulador</a>
          <button className="xl:hidden" aria-expanded={open} aria-label="Menú" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-3 border-t border-line bg-bg px-6 py-4 text-sm xl:hidden">
          {NAV.map((i) => <li key={i.href}><a href={i.href} onClick={() => setOpen(false)}>{i.label}</a></li>)}
        </ul>
      )}
    </header>
  );
}
