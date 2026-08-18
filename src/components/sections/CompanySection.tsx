import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

export function CompanySection() {
  const { mission, team, backing } = site.company;

  return (
    <section className="section company" id="company" aria-labelledby="company-mission-title">
      <div className="container company__grid">
        <div className="company__col reveal">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <p className="company__mission" id="company-mission-title">
            {mission.lead}
          </p>
        </div>

        <div className="company__col reveal">
          <Eyebrow>{team.eyebrow}</Eyebrow>
          <p className="company__text">{team.body}</p>
          <p className="company__note">{team.note}</p>
        </div>

        <div className="company__col reveal">
          <Eyebrow>{backing.eyebrow}</Eyebrow>
          <img className="company__logo" src={backing.logo} alt={backing.logoAlt} loading="lazy" />
          <p className="company__text company__text--sm">{backing.body}</p>
        </div>
      </div>
    </section>
  );
}
