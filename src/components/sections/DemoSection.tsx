import { site } from "../../content/site";
import { Eyebrow } from "../ui/Eyebrow";

export function DemoSection() {
  const { demo } = site;

  return (
    <section className="section section--deep demo" id="demo" aria-labelledby="demo-title">
      <div className="container demo__inner">
        <div className="demo__copy reveal">
          <Eyebrow>{demo.eyebrow}</Eyebrow>
          <h2 className="section__title" id="demo-title">
            {demo.title.map((line) => (
              <span key={line} className="section__title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="section__lede">{demo.body}</p>

          <a
            className="btn btn--accent"
            href={demo.cta.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {demo.cta.label}
          </a>
          <p className="demo__disclaimer">{demo.disclaimer}</p>
        </div>

        <figure className="demo__figure reveal">
          <img src={demo.image} alt={demo.imageAlt} loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
