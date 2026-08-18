import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";
import { Highlight } from "../ui/Highlight";

export function ProblemSection() {
  const { problem } = site;

  return (
    <section className="section section--dark problem" id="problem" aria-labelledby="problem-title">
      <img className="problem__backdrop" src={problem.backdrop} alt="" aria-hidden="true" />
      <div className="problem__scrim" aria-hidden="true" />

      <div className="container problem__inner">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <h2 className="section__title" id="problem-title">
          {problem.title}
        </h2>

        <dl className="problem__stats reveal">
          {problem.stats.map((stat) => (
            <div
              key={stat.value}
              className={stat.lead ? "problem__stat problem__stat--lead" : "problem__stat"}
            >
              <dt className="problem__value">{stat.value}</dt>
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
