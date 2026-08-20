import {
  BellRinging,
  Buildings,
  FileArrowDown,
  HouseLine,
  MapTrifold,
  PlugsConnected,
} from "@phosphor-icons/react";
import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

const FEATURE_ICONS = {
  map: MapTrifold,
  route: Buildings,
  alert: BellRinging,
  report: FileArrowDown,
  passport: HouseLine,
  api: PlugsConnected,
} as const;

export function TechnologyPage() {
  const { technology } = site;
  const { intro, hardware, software, analytics } = technology;

  return (
    <main className="tech-page" id="main">
      <section
        className="tech-layer tech-layer--hardware"
        id="hardware"
        aria-labelledby="hardware-title"
      >
        <div className="tech-route" aria-hidden="true">
          <span className="tech-route__node" />
        </div>

        <div className="container tech-intro">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h1 className="tech-intro__title">
            {intro.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="tech-intro__lede">{intro.lede}</p>

          <nav className="tech-index" aria-label={intro.navLabel}>
            {intro.layers.map((layer, index) => (
              <a className="tech-index__item" href={layer.href} key={layer.href}>
                <span className="tech-index__number">0{index + 1}</span>
                <span>
                  <strong>{layer.label}</strong>
                  <small>{layer.phase}</small>
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="container tech-chapter tech-chapter--hardware">
          <ChapterHeading
            phase={hardware.phase}
            title={hardware.title}
            headline={hardware.headline}
            body={hardware.body}
            titleId="hardware-title"
          />

          <figure className="hardware-figure reveal">
            <div className="hardware-figure__stage">
              <span className="hardware-figure__air hardware-figure__air--in" aria-hidden="true" />
              <img src={hardware.image} alt={hardware.imageAlt} />
              <span className="hardware-figure__air hardware-figure__air--out" aria-hidden="true" />
            </div>
            <figcaption>
              <span>{hardware.caption}</span>
              <strong>{hardware.status}</strong>
            </figcaption>
          </figure>

          <div className="hardware-specs reveal">
            <div className="hardware-specs__methods">
              <p className="tech-label">{hardware.methodLabel}</p>
              <dl>
                {hardware.methods.map((method) => (
                  <div className="hardware-method" key={method.name}>
                    <dt>{method.name}</dt>
                    <dd>{method.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hardware-specs__engineering">
              <p className="tech-label">{hardware.engineeringLabel}</p>
              <div className="engineering-grid">
                {hardware.engineering.map((item) => (
                  <article className="engineering-item" key={item.title}>
                    <span className="engineering-item__dot" aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p className="tech-disclosure reveal">{hardware.disclosure}</p>
        </div>
      </section>

      <section
        className="tech-layer tech-layer--software"
        id="software"
        aria-labelledby="software-title"
      >
        <div className="tech-route" aria-hidden="true">
          <span className="tech-route__node" />
        </div>

        <div className="container tech-chapter tech-chapter--software">
          <ChapterHeading
            phase={software.phase}
            title={software.title}
            headline={software.headline}
            body={software.body}
            titleId="software-title"
          />

          <SoftwareConsole visual={software.visual} />

          <div className="software-features reveal">
            <p className="tech-label">{software.featureLabel}</p>
            <div className="software-features__grid">
              {software.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon];
                return (
                  <article className="software-feature" key={feature.title}>
                    <Icon aria-hidden="true" size={24} weight="duotone" />
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="tech-disclosure tech-disclosure--dark reveal">{software.disclosure}</p>
        </div>
      </section>

      <section
        className="tech-layer tech-layer--analytics"
        id="analytics"
        aria-labelledby="analytics-title"
      >
        <div className="tech-route" aria-hidden="true">
          <span className="tech-route__node" />
        </div>

        <div className="container tech-chapter tech-chapter--analytics">
          <ChapterHeading
            phase={analytics.phase}
            title={analytics.title}
            headline={analytics.headline}
            body={analytics.body}
            titleId="analytics-title"
          />

          <div className="analytics-overview reveal">
            <AnalyticsSignal visual={analytics.visual} />
            <div className="analytics-metrics">
              {analytics.metrics.map((metric) => (
                <div className="analytics-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-pipeline reveal">
            <p className="tech-label">{analytics.stagesLabel}</p>
            <ol>
              {analytics.stages.map((stage) => (
                <li className="analytics-stage" key={stage.step}>
                  <span>{stage.step}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="analytics-close reveal">
            <p>{analytics.note}</p>
            <a className="btn btn--primary" href={analytics.cta.href}>
              {analytics.cta.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChapterHeading({
  phase,
  title,
  headline,
  body,
  titleId,
}: {
  phase: string;
  title: string;
  headline: string;
  body: string;
  titleId: string;
}) {
  return (
    <header className="tech-heading reveal">
      <div className="tech-heading__chapter">
        <span>{phase}</span>
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className="tech-heading__copy">
        <p className="tech-heading__headline">{headline}</p>
        <p className="tech-heading__body">{body}</p>
      </div>
    </header>
  );
}

function SoftwareConsole({ visual }: { visual: (typeof site.technology.software)["visual"] }) {
  return (
    <figure className="software-console reveal" aria-label={visual.product}>
      <div className="software-console__bar">
        <div className="software-console__brand">
          <span aria-hidden="true" />
          <strong>{visual.product}</strong>
        </div>
        <p>
          <span aria-hidden="true" />
          {visual.status}
        </p>
      </div>

      <div className="software-console__body">
        <aside className="software-console__rail" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
        </aside>

        <div className="software-console__workspace">
          <div className="software-console__heading">
            <div>
              <strong>{visual.city}</strong>
              <span>{visual.timestamp}</span>
            </div>
            <span className="software-console__filter">{visual.filter}</span>
          </div>

          <div className="software-console__grid">
            <div className="console-map">
              <div className="console-map__streets" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <i />
                <i />
                <i />
              </div>
              <div className="console-map__route" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="console-map__metric">
                <small>{visual.mapLabel}</small>
                <strong>{visual.mapValue}</strong>
              </div>
            </div>

            <div className="console-side">
              <div className="console-readings">
                {visual.readings.map((reading) => (
                  <div className={`console-reading console-reading--${reading.tone}`} key={reading.label}>
                    <span>{reading.label}</span>
                    <strong>{reading.value}</strong>
                    <small>{reading.unit}</small>
                  </div>
                ))}
              </div>

              <div className="console-chart">
                <div>
                  <small>{visual.chartLabel}</small>
                  <strong>{visual.chartValue}</strong>
                </div>
                <div className="console-chart__bars" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, index) => (
                    <span key={index} />
                  ))}
                </div>
              </div>

              <div className="console-report">
                <FileArrowDown aria-hidden="true" size={20} />
                <span>{visual.report}</span>
                <strong aria-hidden="true">→</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function AnalyticsSignal({ visual }: { visual: (typeof site.technology.analytics)["visual"] }) {
  return (
    <figure className="analytics-signal" aria-label={visual.label}>
      <div className="analytics-signal__input">
        <span>{visual.input}</span>
        <div aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      </div>

      <div className="analytics-signal__core" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>

      <div className="analytics-signal__context">
        <span>{visual.context}</span>
      </div>

      <figcaption>
        <small>{visual.label}</small>
        <strong>{visual.output}</strong>
      </figcaption>
    </figure>
  );
}