type EyebrowProps = {
  children: React.ReactNode;
  /** `light` sits on dark sections, `muted` on the mint "Why ADAM" band. */
  tone?: "cyan" | "muted";
  className?: string;
};

/** Small uppercase kicker above a section heading. */
export function Eyebrow({ children, tone = "cyan", className }: EyebrowProps) {
  return (
    <p className={["eyebrow", `eyebrow--${tone}`, className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
