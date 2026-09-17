/**
 * Ambient data flow over the technology page's city grid: a handful of packets
 * travelling border to border in straight lines along grid lines, each with a
 * trail that fades out behind it. There is no drawn path — the grid is the
 * street, the packet is the traffic.
 *
 * Every packet is one absolutely positioned element animated with a single
 * `transform` (compositor-only, no layout or paint per frame), so seven of them
 * cost about nothing. Positions are snapped to the grid pitch so the packets sit
 * on real lines; the hidden-motion media query removes them entirely.
 */

type DataFlowProps = {
  /** Layer-stack size, in CSS pixels. */
  height: number;
  width: number;
  /** Minor grid pitch, in CSS pixels. */
  cell: number;
  /** Grid x-origin — the container's left edge — from the stack's left edge. */
  originX: number;
  /** Top of the AI-engine band from the stack top; packets below it run green. */
  greenFrom: number;
};

/** Horizontal lanes as fractions of stack height, and their direction. */
const LANES = [
  { at: 0.11, dir: 1 },
  { at: 0.36, dir: -1 },
  { at: 0.6, dir: 1 },
  { at: 0.86, dir: -1 },
] as const;

/** Vertical lanes as fractions of stack width; all flow downwards. */
const COLUMNS = [0.28, 0.56, 0.84] as const;

/** Trail length in cells. */
const TRAIL_CELLS = 6;
/** Travel speed in CSS pixels per second. */
const SPEED = 140;

const snap = (v: number, cell: number) => Math.round(v / cell) * cell;

export function DataFlow({ height, width, cell, originX, greenFrom }: DataFlowProps) {
  if (!height || !width || !cell) return null;

  const trail = TRAIL_CELLS * cell;

  const horizontals = LANES.map((lane, i) => {
    const y = snap(height * lane.at, cell);
    const distance = width + trail;
    return (
      <span
        key={`h${i}`}
        className={`tech-flow__packet tech-flow__packet--h${lane.dir < 0 ? " tech-flow__packet--rev" : ""}${
          y >= greenFrom ? " tech-flow__packet--green" : ""
        }`}
        style={{
          top: y,
          width: trail,
          ...(lane.dir < 0 ? { right: -trail } : { left: -trail }),
          ["--flow-dist" as string]: `${distance}px`,
          ["--flow-dur" as string]: `${(distance / SPEED).toFixed(1)}s`,
          ["--flow-delay" as string]: `${(-(distance / SPEED) * ((i * 0.37) % 1)).toFixed(1)}s`,
        }}
      />
    );
  });

  const verticals = COLUMNS.map((at, i) => {
    const x = originX + snap(width * at - originX, cell);
    const distance = height + trail;
    return (
      <span
        key={`v${i}`}
        className="tech-flow__packet tech-flow__packet--v"
        style={{
          left: x,
          top: -trail,
          height: trail,
          ["--flow-dist" as string]: `${distance}px`,
          ["--flow-dur" as string]: `${(distance / SPEED).toFixed(1)}s`,
          ["--flow-delay" as string]: `${(-(distance / SPEED) * ((i * 0.41 + 0.2) % 1)).toFixed(1)}s`,
        }}
      />
    );
  });

  return (
    <div className="tech-flow" aria-hidden="true">
      {horizontals}
      {verticals}
    </div>
  );
}
