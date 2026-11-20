import type { CSSProperties, ReactNode } from "react";

// Two slightly different hand-drawn strokes so neighbouring words don't look stamped.
const STROKES = [
  ["M2 5.5 C 20 3.5, 48 7, 98 4.2", "M10 8.2 C 38 6.8, 66 8.8, 90 7.4"],
  ["M1 4.8 C 30 6.6, 62 3.2, 99 5.4", "M14 8.4 C 40 7.2, 70 9, 95 7.8"],
];

/** Underlines its text with a pen stroke that draws itself in after `delay` ms. */
export function Scribble({
  children,
  delay = 0,
  variant = 0,
}: {
  children: ReactNode;
  delay?: number;
  variant?: 0 | 1;
}) {
  return (
    <span className="scribble" style={{ "--scribble-delay": `${delay}ms` } as CSSProperties}>
      {children}
      <svg aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none">
        {STROKES[variant].map((d) => (
          <path key={d} d={d} pathLength={1} />
        ))}
      </svg>
    </span>
  );
}
