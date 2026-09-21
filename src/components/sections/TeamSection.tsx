import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Named founders as a 3-up card row, with the wider engineering, software and design
 * bench collected in a single panel underneath — the founders are the part a visitor
 * needs to recognise, the rest is capability, not people they will meet.
 */
export function TeamSection() {
  const { team } = site;

  return (
    <section className="section section--surface team" id="team" aria-labelledby="team-title">
      <div className="container">
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 className="section__title" id="team-title">
          {team.title}
        </h2>
        <p className="section__lede team__lede">{team.lede}</p>

        <ul className="team__grid">
          {team.members.map((member) => (
            <li className="member reveal" key={member.name}>
              <img
                className="member__photo"
                src={member.photo}
                alt={member.photoAlt}
                width={214}
                height={214}
                loading="lazy"
              />
              <div className="member__body">
                <h3 className="member__name">{member.name}</h3>
                <p className="member__role">{member.role}</p>
                <p className="member__credential">{member.credential}</p>
                <p className="member__focus">{member.focus}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="team__bench reveal">
          <h3 className="team__bench-title">{team.bench.title}</h3>
          <ul className="team__bench-list">
            {team.bench.items.map((item) => (
              <li className="team__bench-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
