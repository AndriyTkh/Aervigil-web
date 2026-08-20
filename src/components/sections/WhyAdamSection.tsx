import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

export function WhyAdamSection() {
  const { why } = site;

  return (
    <section className="section section--mist why" id="why" aria-labelledby="why-title">
      <div className="container">
        <Eyebrow tone="muted">{why.eyebrow}</Eyebrow>
        <h2 className="section__title" id="why-title">
          {why.title}
        </h2>

        <ul className="why__grid">
          {why.advantages.map((advantage) => (
            <li className="advantage reveal" key={advantage.num}>
              <div className="advantage__icon">
                <img src={advantage.icon} alt="" loading="lazy" />
              </div>
              <div className="advantage__body">
                <h3 className="advantage__title">{advantage.title}</h3>
                <p className="advantage__text">{advantage.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
