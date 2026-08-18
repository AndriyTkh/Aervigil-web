import { site } from "../../content/site";

export function ContactSection() {
  const { contact } = site;
  const mailto = `mailto:?subject=${encodeURIComponent(contact.mailSubject)}`;

  return (
    <section className="section section--gradient contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <h2 className="section__title section__title--lg" id="contact-title">
          {contact.title}
        </h2>
        <p className="contact__body">{contact.body}</p>
        <a className="btn btn--gradient" href={mailto}>
          {contact.ctaLabel}
        </a>
      </div>
    </section>
  );
}
