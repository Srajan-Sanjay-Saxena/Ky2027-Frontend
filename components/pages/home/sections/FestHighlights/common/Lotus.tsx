import { memo } from "react";

// Lotus SVG Component
export const LotusSVG = memo(function LotusSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 50" className={className}>
      <ellipse cx="40" cy="45" rx="35" ry="5" fill="#2D5016" opacity="0.5" />
      <path d="M40 40 Q30 30 25 15 Q40 25 40 40" fill="#FF69B4" opacity="0.8" />
      <path d="M40 40 Q50 30 55 15 Q40 25 40 40" fill="#FF69B4" opacity="0.8" />
      <path d="M40 40 Q25 35 10 25 Q30 30 40 40" fill="#FFB6C1" opacity="0.7" />
      <path d="M40 40 Q55 35 70 25 Q50 30 40 40" fill="#FFB6C1" opacity="0.7" />
      <path d="M40 40 Q35 25 40 10 Q45 25 40 40" fill="#FFC0CB" />
      <circle cx="40" cy="35" r="5" fill="#FFD700" />
    </svg>
  );
});