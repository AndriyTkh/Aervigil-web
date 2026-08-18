/**
 * Two routes — a city route (cyan) and a fleet route (green) — converging into
 * one shared line. Sits between the two audience columns in the pilot section.
 * Decorative; CSS collapses it to a horizontal gradient rule once the columns
 * stack.
 *
 * Same construction as {@link RouteLine}: a solid base stroke plus one brighter
 * pulse per route, dash-normalised with `pathLength="100"` so the -100
 * `stroke-dashoffset` cycle wraps seamlessly.
 */
const CITY_D = "M88,0 L88,90 C88,110 100,118 106,136 C110,148 110,160 110,180 L110,300";
const FLEET_D = "M132,0 L132,80 C132,104 118,112 112,132 C109,144 110,158 110,178";

export function RouteJunction() {
  return (
    <div className="route-junction" aria-hidden="true">
      <div className="route-junction__heads">
        <span className="route-junction__head route-junction__head--cyan" />
        <span className="route-junction__head route-junction__head--green" />
      </div>
      <svg
        className="route-junction__svg"
        viewBox="0 0 220 300"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className="route-junction__path"
          d={CITY_D}
          fill="none"
          stroke="var(--c-cyan)"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="route-junction__path"
          d={FLEET_D}
          fill="none"
          stroke="var(--c-green)"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <path
          className="route-junction__pulse route-junction__pulse--city"
          d={CITY_D}
          pathLength="100"
          fill="none"
          stroke="var(--c-cyan)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="11 89"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="route-junction__pulse route-junction__pulse--fleet"
          d={FLEET_D}
          pathLength="100"
          fill="none"
          stroke="var(--c-green)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="11 89"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
