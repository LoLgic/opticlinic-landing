import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Problem, HowItWorks, Models, Simulator, Results, Methodology, Team, Footer } from "./components/Sections";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Models />
        <Simulator />
        <Results />
        <Methodology />
        <Team />
      </main>
      <Footer />
    </>
  );
}
