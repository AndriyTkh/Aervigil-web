import { useEffect } from "react";

/**
 * Reveals every `.reveal` element once it scrolls into view by adding `.is-visible`.
 *
 * Elements are observed once and then unobserved, so the animation never replays.
 * If IntersectionObserver is unavailable — or the visitor prefers reduced motion —
 * everything is revealed immediately, so content is never hidden behind an effect.
 * `.reveal` starts visible in CSS and is only hidden once `.js-reveal` is on <html>,
 * which keeps the page readable with JavaScript disabled.
 */
export function useReveal(): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
