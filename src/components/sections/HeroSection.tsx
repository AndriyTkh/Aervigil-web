import { site } from "../../content/site";

export function HeroSection() {
  const { hero } = site;

  return (
    <header className="hero" id="hero">
      <img className="hero__art" src={hero.image} alt={hero.imageAlt} fetchPriority="high" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          {hero.badge}
        </p>

        <h1 className="hero__title">
          {hero.headline.map((line, index) => (
            <span
              key={line}
              className={
                index === hero.headline.length - 1 ? "hero__title-line hero__title-line--gradient" : "hero__title-line"
              }
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero__tagline">
          {hero.tagline}
          <span className="hero__tagline-line">{hero.sensor}</span>
        </p>
        <p className="hero__body">{hero.body}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn--ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
