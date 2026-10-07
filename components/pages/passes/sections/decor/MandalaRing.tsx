import { memo } from "react";

// ============================================
// Mandala Ring Component
// ============================================
export const MandalaRing = memo(function MandalaRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="65"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      {[...Array(12)].map((_, i) => (
        <line
          key={`line-${i}`}
          x1="100"
          y1="5"
          x2="100"
          y2="30"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.5"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      {[...Array(24)].map((_, i) => (
        <circle
          key={`dot-${i}`}
          cx="100"
          cy="12"
          r="2"
          fill="currentColor"
          opacity="0.4"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`petal-${i}`}
          cx="100"
          cy="60"
          rx="8"
          ry="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
    </svg>
  );
});
