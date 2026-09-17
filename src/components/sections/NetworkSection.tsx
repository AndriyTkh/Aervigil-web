import { site } from "../../content/site";
import { ContactCta } from "../ui/ContactCta";
import { Eyebrow } from "../ui/Eyebrow";

export function NetworkSection() {
  const { network } = site;

  return (
    <section className="section section--mint network" id="network" aria-labelledby="network-title">
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
          <ContactCta>{network.cta.label}</ContactCta>
        </div>
      </div>
    </section>
  );
}

/** Teaser card: icon-led, no description — the full text lives on /solutions. */
function AudienceCard({ audience }: { audience: (typeof site.network.audiences)[number] }) {
  const solutionHref = `/solutions#${audience.id}`;

  return (
    <div className={`audience audience--${audience.accent} reveal`}>
      <a className="audience__icon-link" href={solutionHref} aria-label={`${audience.title} — full solution`}>
        <img className="audience__icon" src={audience.icon} alt={audience.iconAlt} loading="lazy" />
      </a>
      <div>
        <p className="audience__sector">{audience.sector}</p>
        <h3 className="audience__title">{audience.title}</h3>
        <a className="audience__more" href={solutionHref}>
          {site.network.explore}
        </a>
      </div>
    </div>
  );
}
