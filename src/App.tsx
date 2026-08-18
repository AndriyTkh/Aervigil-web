import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { CompanySection } from "./components/sections/CompanySection";
import { ContactSection } from "./components/sections/ContactSection";
import { DemoSection } from "./components/sections/DemoSection";
import { HeroSection } from "./components/sections/HeroSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { NetworkSection } from "./components/sections/NetworkSection";
import { NewsSection } from "./components/sections/NewsSection";
import { ProblemSection } from "./components/sections/ProblemSection";
import { SolutionSection } from "./components/sections/SolutionSection";
import { WhyAdamSection } from "./components/sections/WhyAdamSection";
import { useReveal } from "./hooks/useReveal";

/**
 * Single-page homepage. Section order matches the approved design:
 * hero → problem → solution → how it works → why → demo → pilot → company → news → contact.
 */
export function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      <HeroSection />
      <main id="main">
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <WhyAdamSection />
        <DemoSection />
        <NetworkSection />
        <CompanySection />
        <NewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
