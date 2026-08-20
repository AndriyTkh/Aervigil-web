import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SolutionsPage } from "./components/pages/SolutionsPage";
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
 * Two static pages share one bundle: the homepage and /solutions. Navigation
 * between them is plain full-page loads (both Vercel and the Sites worker
 * rewrite unknown paths to index.html), so the "router" is just a pathname
 * check at load time — no client-side navigation state to manage.
 */
const pagePath = window.location.pathname.replace(/\/+$/, "");

/**
 * Homepage section order matches the approved design:
 * hero → problem → solution → how it works → why → demo → pilot → company → news → contact.
 */
export function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      {pagePath === "/solutions" ? (
        <SolutionsPage />
      ) : (
        <>
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
        </>
      )}
      <SiteFooter />
    </>
  );
}
