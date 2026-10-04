import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Problem, How, Models, Activities } from "./components/Info";
import Simulator from "./components/Simulator";
import { MathModel, Methodology, Project, Footer } from "./components/Final";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><Problem /><How /><Models /><Activities /><Simulator /><MathModel /><Methodology /><Project />
      </main>
      <Footer />
    </>
  );
}
