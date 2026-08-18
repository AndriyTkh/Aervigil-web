/**
 * The page's signature device: a continuous navy → cyan → green measurement route.
 *
 * Rendered behind the "How it works" step row on desktop; CSS hides it once the
 * steps stack, where a vertical rule takes over. Decorative only, so it is
 * hidden from assistive technology.
 *
 * The route itself is a solid gradient stroke. A single brighter pulse travels
 * along it: `pathLength="100"` normalises the dash pattern to the path length,
 * so animating `stroke-dashoffset` by exactly -100 is one whole period — the
 * pulse leaves the right edge as its next repeat enters on the left, with no
 * jump at the loop boundary. Motion is disabled under `prefers-reduced-motion`.
 */
const ROUTE_D =
  "M0,44 C70,10 150,10 229,44 S 380,80 458,44 S 610,10 687,44 S 838,80 916,44 S 1080,12 1144,44";

export function RouteLine() {
  return (
    <svg
      className="route-line"
      viewBox="0 0 1144 88"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="routeLineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--c-navy)" />
          <stop offset=".55" stopColor="var(--c-cyan)" />
          <stop offset="1" stopColor="var(--c-green)" />
        </linearGradient>
      </defs>

      <path
        className="route-line__path"
        d={ROUTE_D}
        fill="none"
        stroke="url(#routeLineGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        className="route-line__pulse"
        d={ROUTE_D}
        pathLength="100"
        fill="none"
        stroke="url(#routeLineGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="9 91"
      />
    </svg>
  );
}
