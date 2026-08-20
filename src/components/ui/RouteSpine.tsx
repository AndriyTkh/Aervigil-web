/**
 * Vertical counterpart of `RouteLine` for the solutions page: ONE continuous
 * spine drawn over the whole sector stack, so the travelling pulse runs the
 * full page without resetting at section boundaries.
 *
 * The path is generated from measured geometry — the stack's rendered height
 * and each station node's offset within it. The route runs straight down
 * through every station marker and meanders in the stretches between them,
 * alternating sides. The viewBox height is scaled to the real aspect ratio
 * (88 units ↔ 3.5rem), which keeps the curve's proportions stable, and
 * `vector-effect: non-scaling-stroke` keeps the stroke width uniform.
 *
 * The gradient recolours the stroke per sector (stops are computed from the
 * measured section boundaries) and fades the ends out, so the route appears
 * to enter and leave the page rather than being clipped.
 */

export type SpineStop = {
  /** 0..1 along the spine. */
  offset: number;
  /** CSS colour (typically `var(--c-…)`). */
  color: string;
  opacity?: number;
};

type RouteSpineProps = {
  /** Sector-stack height, in CSS pixels. */
  height: number;
  /** Station-node centre offsets from the stack top, in CSS pixels. */
  nodes: number[];
  stops: SpineStop[];
};

/** viewBox width; the rail centre sits at half of it. */
const VB_W = 88;
const CX = VB_W / 2;
/** Rendered width is 3.5rem = 56px, so 88 viewBox units ↔ 56px. */
const PX_TO_VB = VB_W / 56;
/** Straight vertical run kept above/below each station, in viewBox units. */
const STATION_RUN = 70;
/** Pulse speed: CSS pixels of route per second. */
const PULSE_SPEED = 110;

/**
 * One S-less bulge between two vertical runs: leaves x=44 vertically at `y1`,
 * bows out to `x`, and returns vertically to x=44 at `y2`. Stretches too short
 * to bow stay on the rail.
 */
function meander(y1: number, y2: number, x: number): string {
  const span = y2 - y1;
  if (span < 180) return `L${CX},${y2}`;

  const mid = y1 + span / 2;
  const bend = span * 0.22;
  return (
    `C${CX},${y1 + bend} ${x},${mid - bend} ${x},${mid} ` +
    `C${x},${mid + bend} ${CX},${y2 - bend} ${CX},${y2}`
  );
}

/** Straight through every station, alternating bulges in between. */
function spinePath(vbHeight: number, vbNodes: number[]): string {
  const parts = [`M${CX},0`];
  let penY = 0;
  let side = 0;

  for (const nodeY of vbNodes) {
    const runStart = Math.max(penY, nodeY - STATION_RUN);
    parts.push(meander(penY, runStart, side % 2 ? 72 : 16));
    side += 1;
    parts.push(`L${CX},${Math.min(nodeY + STATION_RUN, vbHeight)}`);
    penY = Math.min(nodeY + STATION_RUN, vbHeight);
  }

  parts.push(meander(penY, vbHeight, side % 2 ? 72 : 16));
  return parts.join(" ");
}

export function RouteSpine({ height, nodes, stops }: RouteSpineProps) {
  if (!height || !nodes?.length) return null;

  const vbHeight = height * PX_TO_VB;
  const d = spinePath(
    vbHeight,
    nodes.map((y) => y * PX_TO_VB),
  );

  return (
    <svg
      className="sol-spine"
      viewBox={`0 0 ${VB_W} ${vbHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="routeSpine" x1="0" y1="0" x2="0" y2="1">
          {stops.map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity ?? 1}
            />
          ))}
        </linearGradient>
      </defs>

      <path
        className="sol-spine__path"
        d={d}
        fill="none"
        stroke="url(#routeSpine)"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <path
        className="sol-spine__pulse"
        d={d}
        pathLength="100"
        fill="none"
        stroke="url(#routeSpine)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="6 94"
        vectorEffect="non-scaling-stroke"
        style={{ animationDuration: `${(height / PULSE_SPEED).toFixed(2)}s` }}
      />
    </svg>
  );
}
