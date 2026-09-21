import { Suspense, lazy } from "react";
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
import { TeamSection } from "./components/sections/TeamSection";
import { WhyAdamSection } from "./components/sections/WhyAdamSection";
import { useReveal } from "./hooks/useReveal";

/**
 * Three static pages — the homepage, /solutions and /technology. Navigation between them
 * is plain full-page loads (both Vercel and the Sites worker rewrite unknown paths to
 * index.html), so the "router" is just a pathname check at load time — no client-side
 * navigation state to manage.
 */
const pagePath = window.location.pathname.replace(/\/+$/, "");

/**
 * The homepage is the entry point for nearly all traffic, so the two secondary pages are
 * split into their own chunks rather than riding along in its bundle. Each one is a plain
 * full-page load, so its chunk is requested immediately and only the page it belongs to
 * pays for it.
 */
const SolutionsPage = lazy(() =>
  import("./components/pages/SolutionsPage").then((m) => ({ default: m.SolutionsPage })),
);
const TechnologyPage = lazy(() =>
  import("./components/pages/TechnologyPage").then((m) => ({ default: m.TechnologyPage })),
);

/**
 * Homepage section order matches the approved design:
 * hero → problem → solution → how it works → why → demo → pilot → company → team → news → contact.
 */
export function App() {
  useReveal();

  return (
    <>
      <SiteHeader />
      {pagePath === "/solutions" ? (
        <Suspense fallback={null}>
          <SolutionsPage />
        </Suspense>
      ) : pagePath === "/technology" ? (
        <Suspense fallback={null}>
          <TechnologyPage />
        </Suspense>
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
            <TeamSection />
            <NewsSection />
            <ContactSection />
          </main>
        </>
      )}
      <SiteFooter />
    </>
  );
}
