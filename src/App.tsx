import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Problem, How, Models, Activities } from "./components/Info";
import Simulator from "./components/Simulator";
import { MathModel, Methodology, Project, Footer } from "./components/Final";
import Assumptions from "./components/Assumptions";
import { ResultProvider } from "./ResultContext";

export default function App() {
  return (
    <ResultProvider>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero /><Problem /><How /><Models /><Activities /><Simulator /><MathModel /><Methodology /><Assumptions /><Project />
      </main>
      <Footer />
    </ResultProvider>
  );
}
