import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";
import { Highlight } from "../ui/Highlight";

export function ProblemSection() {
  const { problem } = site;

  return (
    <section className="section section--dark problem" id="problem" aria-label={problem.label}>
      <img
        className="problem__backdrop"
        src={problem.backdrop}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="problem__scrim" aria-hidden="true" />

      <div className="container problem__inner">
        <Eyebrow>{problem.eyebrow}</Eyebrow>

        <dl className="problem__stats reveal">
          {problem.stats.map((stat) => (
            <div
              key={stat.value ?? stat.text}
              className={[
                "problem__stat",
                stat.lead ? "problem__stat--lead" : "",
                stat.note ? "problem__stat--note" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {stat.value ? <dt className="problem__value">{stat.value}</dt> : null}
              <dd className="problem__text">
                <Highlight text={stat.text} emphasis={stat.emphasis} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
