import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";
import { RouteSpine, type SpineStop } from "../ui/RouteSpine";

/**
 * /solutions — the three market sectors from the brief (B2G, B2B, B2C), each
 * as its own colour band with the full challenge/solution text, threaded
 * together by the vertical route spine. Homepage teaser cards deep-link to
 * the section ids here (`#cities`, `#industry`, `#citizens`).
 */

/** Band background + spine colour per sector, in page order. */
const SECTOR_CHROME: Record<string, { band: string; color: string }> = {
  cities: { band: "section--mint", color: "var(--c-cyan)" },
  industry: { band: "section--surface", color: "var(--c-green)" },
  citizens: { band: "section--dark", color: "var(--c-green)" },
};

type SpineGeometry = {
  height: number;
  nodes: number[];
  stops: SpineStop[];
};

/**
 * The spine is one SVG over the whole sector stack, so its path and gradient
 * are derived from real geometry: station-node centres for the straight runs,
 * section boundaries for the colour handoffs. Re-measured on any resize.
 */
function useSpineGeometry() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [spine, setSpine] = useState<SpineGeometry>({ height: 0, nodes: [], stops: [] });

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const measure = () => {
      const stackBox = stack.getBoundingClientRect();
      if (stackBox.height === 0) return;

      const nodes = [...stack.querySelectorAll(".sol-node")]
        .map((node) => {
          const box = node.getBoundingClientRect();
          return box.height > 0 ? box.top - stackBox.top + box.height / 2 : null;
        })
        .filter((y): y is number => y !== null);

      const sectors = [...stack.querySelectorAll<HTMLElement>(".sol-sector")];
      const stops: SpineStop[] = [
        { offset: 0, color: "var(--c-navy)", opacity: 0 },
        { offset: 0.08, color: "var(--c-navy)" },
      ];
      sectors.forEach((sector, i) => {
        const box = sector.getBoundingClientRect();
        const bottom = (box.bottom - stackBox.top) / stackBox.height;
        const color = SECTOR_CHROME[sector.id]?.color ?? "var(--c-cyan)";
        if (i < sectors.length - 1) {
          stops.push({ offset: bottom, color });
        } else {
          stops.push({ offset: Math.min(bottom, 0.94), color });
          stops.push({ offset: 1, color, opacity: 0 });
        }
      });

      setSpine({ height: stackBox.height, nodes, stops });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

  return { stackRef, spine };
}

export function SolutionsPage() {
  const { solutions, network } = site;
  const { stackRef, spine } = useSpineGeometry();

  // The page renders after the document's own anchor pass, so honour a
  // deep-link hash (e.g. /solutions#industry) once the sections exist.
  // Instant, not smooth: arriving on a fresh page should land, not travel.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <main id="main">
      <section className="section sol-intro" id="hero" aria-labelledby="solutions-title">
        <div className="container">
          <Eyebrow>{solutions.eyebrow}</Eyebrow>
          <h1 className="section__title section__title--lg" id="solutions-title">
            {solutions.title.map((line) => (
              <span className="section__title-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="section__lede">{solutions.lede}</p>
        </div>
      </section>

      <div className="sol-sectors" ref={stackRef}>
        <RouteSpine height={spine.height} nodes={spine.nodes} stops={spine.stops} />
        {network.audiences.map((audience) => (
          <SectorSection key={audience.id} audience={audience} />
        ))}
      </div>

      <section className="section section--surface sol-cta" aria-labelledby="sol-cta-title">
        <div className="container">
          <h2 className="section__title section__title--sm" id="sol-cta-title">
            {solutions.cta.title}
          </h2>
          <p className="section__lede">{solutions.cta.body}</p>
          <a className="btn btn--primary" href={solutions.cta.href}>
            {solutions.cta.label}
          </a>
        </div>
      </section>
    </main>
  );
}

function SectorSection({ audience }: { audience: (typeof site.network.audiences)[number] }) {
  const { solutions } = site;
  const chrome = SECTOR_CHROME[audience.id];
  const titleId = `sol-${audience.id}-title`;

  return (
    <section
      className={`section ${chrome.band} sol-sector sol-sector--${audience.accent}`}
      id={audience.id}
      aria-labelledby={titleId}
    >
      <div className="container sol-sector__inner">
        <div className="sol-sector__rail" aria-hidden="true">
          <span className="sol-node" />
        </div>

        <div className="sol-sector__content reveal">
          <div className="sol-sector__head">
            <span className="sol-sector__icon">
              <img src={audience.icon} alt={audience.iconAlt} loading="lazy" />
            </span>
            <div>
              <p className="sol-sector__badge">{audience.sector}</p>
              <h2 className="section__title section__title--sm" id={titleId}>
                {audience.title}
              </h2>
            </div>
          </div>

          {audience.cases.map((entry) => (
            <article className="sol-case" key={entry.title}>
              <h3 className="sol-case__title">{entry.title}</h3>
              <div className="sol-case__grid">
                <div className="sol-case__cell">
                  <p className="sol-case__label">{solutions.challengeLabel}</p>
                  <p className="sol-case__copy">{entry.challenge}</p>
                </div>
                <div className="sol-case__cell sol-case__cell--solution">
                  <p className="sol-case__label">{solutions.solutionLabel}</p>
                  <p className="sol-case__copy">{entry.solution}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
