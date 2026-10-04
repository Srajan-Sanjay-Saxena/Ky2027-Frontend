
import { memo } from "react";

// Trishul SVG Component
export const Trishul = memo(function Trishul({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} fill="currentColor">
      <path
        d="M28 120V45M28 45L15 25L28 35L28 10L32 10L32 35L45 25L32 45M30 10L30 0M25 8L30 0L35 8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="30" cy="5" r="3" fill="currentColor" />
    </svg>
  );
});