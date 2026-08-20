import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

export function NetworkSection() {
  const { network } = site;

  return (
    <section className="section section--surface network" id="network" aria-labelledby="network-title">
      <div className="container">
        <Eyebrow>{network.eyebrow}</Eyebrow>
        <h2 className="section__title" id="network-title">
          {network.title}
        </h2>

        <div className="network__grid">
          {network.audiences.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} />
          ))}
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

/** Teaser card: the full challenge/solution text lives on /solutions. */
function AudienceCard({ audience }: { audience: (typeof site.network.audiences)[number] }) {
  return (
    <div className={`audience audience--${audience.accent} reveal`}>
      <img className="audience__icon" src={audience.icon} alt={audience.iconAlt} loading="lazy" />
      <div>
        <p className="audience__sector">{audience.sector}</p>
        <h3 className="audience__title">{audience.title}</h3>
        <p className="audience__copy">{audience.summary}</p>
        <a className="audience__more" href={`/solutions#${audience.id}`}>
          {site.network.explore}
        </a>
      </div>
    </div>
  );
}
