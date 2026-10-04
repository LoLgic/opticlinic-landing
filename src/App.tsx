import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Problem, How, Models, Activities } from "./components/Info";
import Simulator from "./components/Simulator";
import { MathModel, Methodology, Project, Footer } from "./components/Final";
import Assumptions from "./components/Assumptions";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><Problem /><How /><Models /><Activities /><Simulator /><MathModel /><Methodology /><Assumptions /><Project />
      </main>
      <Footer />
    </>
  );
}
