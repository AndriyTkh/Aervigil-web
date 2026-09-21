import type { ReactNode } from "react";
import { site } from "../../content/site";

/**
 * Every "get in touch" call to action on the site — header, pilot CTAs on the homepage,
 * /solutions and /technology, and the contact section — opens the visitor's mail client
 * addressed to the shared inbox, with one subject so incoming mail is easy to spot.
 */
export const contactMailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.mailSubject)}`;

type ContactCtaProps = {
  children: ReactNode;
  /** Visual weight. `primary` on light sections, `accent` on the dark contact section. */
  variant?: "primary" | "accent";
  /** Compact size, used inside the header. */
  size?: "sm";
  className?: string;
  onClick?: () => void;
};

export function ContactCta({ children, variant = "primary", size, className, onClick }: ContactCtaProps) {
  const classes = ["btn", `btn--${variant}`, size ? `btn--${size}` : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={contactMailto} onClick={onClick}>
      {children}
    </a>
  );
}
