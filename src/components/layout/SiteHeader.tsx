import { useEffect, useId, useState } from "react";
import { site } from "../../content/site";
import { useScrolled } from "../../hooks/useScrolled";

export function SiteHeader() {
  const { nav, brand } = site;
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Close the drawer on Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // A drawer left open while the viewport grows back to desktop would trap scroll.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 62rem)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
        <a className="skip-link" href="#hero">
          Skip to content
        </a>

        <div className="site-header__inner">
          <a className="brand" href="#hero" aria-label={`${brand.product} ${brand.lockup} — home`}>
            <img className="brand__logo" src={brand.logoColor} alt="" />
            <span className="brand__lockup">{brand.lockup}</span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__bars" aria-hidden="true" />
            {menuOpen ? "Close" : "Menu"}
          </button>

          <nav
            id={menuId}
            className={menuOpen ? "site-nav is-open" : "site-nav"}
            aria-label="Primary"
          >
            <ul className="site-nav__list">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a className="site-nav__link" href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="btn btn--primary btn--sm"
              href={nav.cta.href}
              onClick={() => setMenuOpen(false)}
            >
              {nav.cta.label}
            </a>
          </nav>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise make this fixed
          element resolve against the header box instead of the viewport. */}
      {menuOpen ? (
        <button
          type="button"
          className="site-nav__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </>
  );
}
