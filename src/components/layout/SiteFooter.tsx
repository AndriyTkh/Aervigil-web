import { site } from "../../content/site";

export function SiteFooter() {
  const { footer, brand } = site;

  return (
    <footer className="site-footer">
      <img className="site-footer__skyline" src={footer.skyline} alt="" aria-hidden="true" loading="lazy" />
      <div className="site-footer__scrim" aria-hidden="true" />

      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__mark">
              <img
                className="site-footer__logo"
                src={brand.logoSignLight}
                alt=""
                loading="lazy"
              />
              <span className="site-footer__lockup">
                <span className="site-footer__product">{brand.product}</span>
                <span className="site-footer__company">{brand.lockup}</span>
              </span>
            </div>
            <p className="site-footer__tagline">{footer.tagline}</p>
          </div>

          <div className="site-footer__groups">
            {footer.groups.map((group) => (
              <nav className="site-footer__group" key={group.title} aria-label={group.title}>
                <h2 className="site-footer__group-title">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="site-footer__legal">{footer.legal}</p>
      </div>
    </footer>
  );
}
