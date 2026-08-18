import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";
import { RouteJunction } from "../ui/RouteJunction";

export function NetworkSection() {
  const { network } = site;
  const [cities, fleets] = network.audiences;

  return (
    <section className="section section--surface network" id="network" aria-labelledby="network-title">
      <div className="container">
        <Eyebrow>{network.eyebrow}</Eyebrow>
        <h2 className="section__title" id="network-title">
          {network.title}
        </h2>

        <div className="network__grid">
          <AudienceCard audience={cities} />
          <RouteJunction />
          <AudienceCard audience={fleets} />
        </div>

        <div className="network__cta">
          <a className="btn btn--primary" href={network.cta.href}>
            {network.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function AudienceCard({ audience }: { audience: (typeof site.network.audiences)[number] }) {
  return (
    <div className={`audience audience--${audience.accent} reveal`}>
      <img className="audience__icon" src={audience.icon} alt={audience.iconAlt} loading="lazy" />
      <div>
        <h3 className="audience__title">{audience.title}</h3>
        <ul className="audience__points">
          {audience.points.map((point) => (
            <li key={point}>
              <span className="audience__tick" aria-hidden="true">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
