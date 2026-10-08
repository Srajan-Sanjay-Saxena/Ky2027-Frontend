"use client";

import { forwardRef } from "react";

interface RingProgressProps {
  className?: string;
}

export const RingProgress = forwardRef<SVGCircleElement, RingProgressProps>(function RingProgress(
  { className },
  ref
) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="49" stroke="rgba(217,180,106,.12)" strokeWidth="1" fill="none" />
      <circle
        ref={ref}
        id="ring"
        cx="50"
        cy="50"
        r="49"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        transform="rotate(-90 50 50)"
        fill="none"
        strokeLinecap="round"
        className="cinematic-ring"
      />
    </svg>
  );
});
