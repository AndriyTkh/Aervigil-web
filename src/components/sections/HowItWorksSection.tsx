import { site } from "../../content/site";
import { RouteLine } from "../ui/RouteLine";

export function HowItWorksSection() {
  const { how } = site;

  return (
    <section className="section section--mint how" id="how" aria-labelledby="how-title">
      <div className="container">
        <div className="how__head">
          <h2 className="section__title section__title--sm" id="how-title">
            {how.title}
          </h2>
          <p className="how__lede">{how.lede}</p>
        </div>

        <div className="how__track">
          <RouteLine />
          <ol className="how__steps">
            {how.steps.map((step) => (
              <li className="step reveal" key={step.num}>
                <div className="step__badge">
                  <img className="step__icon" src={step.icon} alt="" loading="lazy" />
                </div>
                <p className="step__num">{step.num}</p>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
