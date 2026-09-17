import { useEffect } from "react";

/**
 * Reveals every `.reveal` element once it scrolls into view by adding `.is-visible`.
 *
 * Elements are observed once and then unobserved, so the animation never replays.
 * If IntersectionObserver is unavailable — or the visitor prefers reduced motion —
 * everything is revealed immediately, so content is never hidden behind an effect.
 * `.reveal` starts visible in CSS and is only hidden once `.js-reveal` is on <html>,
 * which keeps the page readable with JavaScript disabled.
 *
 * The secondary pages are lazy-loaded, so their `.reveal` elements enter the DOM after
 * this effect has run. A MutationObserver picks those up; without it they would stay
 * hidden behind `.js-reveal` forever.
 */
export function useReveal(): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const collect = (root: ParentNode) =>
      Array.from(root.querySelectorAll<HTMLElement>(".reveal"));

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      const revealAll = () =>
        collect(document).forEach((node) => node.classList.add("is-visible"));
      revealAll();
      const mutations = new MutationObserver(revealAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
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

    const observed = new WeakSet<Element>();
    const track = (nodes: HTMLElement[]) => {
      for (const node of nodes) {
        if (observed.has(node)) continue;
        observed.add(node);
        observer.observe(node);
      }
    };

    track(collect(document));
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof HTMLElement)) continue;
          if (added.classList.contains("reveal")) track([added]);
          track(collect(added));
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
