import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

export function SolutionSection() {
  const { solution } = site;

  return (
    <section className="section solution" id="solution" aria-labelledby="solution-title">
      <div className="container solution__inner">
        <div className="solution__copy reveal">
          <Eyebrow>{solution.eyebrow}</Eyebrow>
          <h2 className="section__title" id="solution-title">
            {solution.title.map((line) => (
              <span key={line} className="section__title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="section__lede">{solution.body}</p>

          <div className="solution__specs">
            {solution.specs.map((spec) => (
              <div key={spec.title} className={`spec spec--${spec.accent}`}>
                <h3 className="spec__title">{spec.title}</h3>
                <p className="spec__body">{spec.body}</p>
              </div>
            ))}
          </div>
        </div>

        <figure className="hardware reveal">
          <img className="hardware__image" src={solution.figure.image} alt={solution.figure.alt} loading="lazy" />
          <figcaption className="hardware__caption">
            <span>{solution.figure.caption}</span>
            <span className="hardware__status">{solution.figure.status}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
