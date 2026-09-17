/* Per-icon entry points: the package barrel pulls in all ~9000 icons, which Vite
   pre-bundles into a single 6.5 MB module in dev. */
import { BellRinging } from "@phosphor-icons/react/dist/csr/BellRinging";
import { DeviceMobile } from "@phosphor-icons/react/dist/csr/DeviceMobile";
import { FileArrowDown } from "@phosphor-icons/react/dist/csr/FileArrowDown";
import { HouseLine } from "@phosphor-icons/react/dist/csr/HouseLine";
import { MapTrifold } from "@phosphor-icons/react/dist/csr/MapTrifold";
import { PlugsConnected } from "@phosphor-icons/react/dist/csr/PlugsConnected";
import { Truck } from "@phosphor-icons/react/dist/csr/Truck";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";
import { DataFlow } from "../ui/DataFlow";

/**
 * /technology — the three layers of the system as colour bands laid over a
 * faded city grid with ambient data packets travelling its lines: the
 * `/solutions` sector structure, without the drawn route.
 * Anchors are deep-linkable: `#hardware`, `#software`, `#ai-engine`.
 */

const FEATURE_ICONS = {
  map: MapTrifold,
  fleet: Truck,
  alert: BellRinging,
  report: FileArrowDown,
  passport: HouseLine,
  api: PlugsConnected,
  mobile: DeviceMobile,
} as const;

/** Band background + accent per layer, in page order. */
const LAYER_CHROME = [
  { id: "hardware", band: "section--mist", accent: "cyan" },
  { id: "software", band: "section--dark", accent: "navy" },
  { id: "ai-engine", band: "section--mint", accent: "green" },
] as const;

type FlowGeometry = {
  height: number;
  width: number;
  /** Minor grid pitch in CSS pixels — `--tech-cell` (2rem) at the live root size. */
  cell: number;
  /** Container left edge from the stack's left edge — the grid's x-origin. */
  originX: number;
  /** Top of the AI-engine band from the stack top. */
  greenFrom: number;
};

/**
 * The data packets need real geometry to sit on grid lines: the stack's size,
 * the grid pitch, where the grid's x-origin falls, and where the green band
 * starts so packets change colour with the surface they cross.
 */
function useFlowGeometry() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [flow, setFlow] = useState<FlowGeometry>({
    height: 0,
    width: 0,
    cell: 0,
    originX: 0,
    greenFrom: 0,
  });

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const measure = () => {
      const stackBox = stack.getBoundingClientRect();
      if (stackBox.height === 0) return;

      // `--tech-cell` is authored in rem; custom properties come back unresolved.
      const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const cellRaw = getComputedStyle(stack).getPropertyValue("--tech-cell").trim();
      const cell = (parseFloat(cellRaw) || 2) * (cellRaw.endsWith("rem") ? rootPx : 1);

      const inner = stack.querySelector(".tech-layer__inner");
      const originX = inner ? inner.getBoundingClientRect().left - stackBox.left : 0;
      const ai = stack.querySelector("#ai-engine");
      const greenFrom = ai ? ai.getBoundingClientRect().top - stackBox.top : stackBox.height;

      setFlow({ height: stackBox.height, width: stackBox.width, cell, originX, greenFrom });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stack);
    return () => observer.disconnect();
  }, []);

  return { stackRef, flow };
}

/** Deep links land rather than travel: the page renders after the anchor pass. */
function useHashLanding() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: "instant" });
  }, []);
}

export function TechnologyPage() {
  const { technology } = site;
  const { stackRef, flow } = useFlowGeometry();
  useHashLanding();

  return (
    <main id="main">
      <section className="section tech-intro" id="hero" aria-labelledby="technology-title">
        <div className="container">
          <Eyebrow>{technology.eyebrow}</Eyebrow>
          <h1 className="section__title section__title--lg" id="technology-title">
            {technology.title.map((line) => (
              <span className="section__title-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="section__lede">{technology.lede}</p>
        </div>
      </section>

      <div className="tech-layers" ref={stackRef}>
        <DataFlow
          height={flow.height}
          width={flow.width}
          cell={flow.cell}
          originX={flow.originX}
          greenFrom={flow.greenFrom}
        />
        <HardwareLayer />
        <SoftwareLayer />
        <AiLayer />
      </div>

      <section className="section section--mint tech-cta" aria-labelledby="tech-cta-title">
        <div className="container">
          <h2 className="section__title section__title--sm" id="tech-cta-title">
            {technology.cta.title}
          </h2>
          <p className="section__lede">{technology.cta.body}</p>
          <a className="btn btn--primary" href={technology.cta.href}>
            {technology.cta.label}
          </a>
        </div>
      </section>
    </main>
  );
}

/** Shared band chrome: the layer number, the heading and the lede. */
function LayerShell({
  id,
  num,
  title,
  lede,
  children,
}: {
  id: (typeof LAYER_CHROME)[number]["id"];
  num: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  const chrome = LAYER_CHROME.find((entry) => entry.id === id)!;
  const titleId = `tech-${id}-title`;

  return (
    <section
      className={`section ${chrome.band} tech-layer tech-layer--${chrome.accent}`}
      id={id}
      aria-labelledby={titleId}
    >
      <div className="container tech-layer__inner">
        <div className="tech-layer__content reveal">
          <p className="tech-layer__num">{num}</p>
          <h2 className="section__title section__title--sm" id={titleId}>
            {title}
          </h2>
          <p className="tech-layer__lede">{lede}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

function HardwareLayer() {
  const { hardware } = site.technology;

  return (
    <LayerShell id="hardware" num="01" title={hardware.title} lede={hardware.lede}>
      <div className="tech-hardware">
        <div className="tech-hardware__specs">
          <p className="tech-layer__label">{hardware.methodsLabel}</p>
          <ul className="tech-methods">
            {hardware.methods.map((entry) => (
              <li className="tech-method" key={entry.method}>
                <span className="tech-method__name">{entry.method}</span>
                <span className="tech-method__body">{entry.body}</span>
              </li>
            ))}
          </ul>

          <p className="tech-layer__label tech-layer__label--spaced">{hardware.systemsLabel}</p>
          <ul className="tech-systems">
            {hardware.systems.map((entry) => (
              <li className="tech-system" key={entry.title}>
                <span className="tech-system__name">{entry.title}</span>
                <span className="tech-system__body">{entry.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="tech-figure">
          <img src={hardware.figure.src} alt={hardware.figure.alt} loading="lazy" />
          <figcaption className="tech-figure__caption">{hardware.figure.caption}</figcaption>
        </figure>
      </div>

      <p className="tech-hardware__operation">{hardware.operation}</p>
      <p className="tech-callout">{hardware.certification}</p>
    </LayerShell>
  );
}

function SoftwareLayer() {
  const { software } = site.technology;

  return (
    <LayerShell id="software" num="02" title={software.title} lede={software.lede}>
      <ul className="tech-features">
        {software.features.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon as keyof typeof FEATURE_ICONS];
          return (
            <li className="tech-feature" key={feature.title}>
              <Icon className="tech-feature__icon" weight="light" aria-hidden="true" />
              <h3 className="tech-feature__title">{feature.title}</h3>
              <p className="tech-feature__body">{feature.body}</p>
            </li>
          );
        })}
      </ul>
      <p className="tech-disclaimer">{software.disclaimer}</p>
    </LayerShell>
  );
}

function AiLayer() {
  const { ai } = site.technology;

  return (
    <LayerShell id="ai-engine" num="03" title={ai.title} lede={ai.lede}>
      <ol className="tech-steps">
        {ai.steps.map((step) => (
          <li className="tech-step" key={step.num}>
            <span className="tech-step__num">{step.num}</span>
            <div>
              <h3 className="tech-step__title">{step.title}</h3>
              <p className="tech-step__body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="tech-disclaimer">{ai.note}</p>
    </LayerShell>
  );
}
