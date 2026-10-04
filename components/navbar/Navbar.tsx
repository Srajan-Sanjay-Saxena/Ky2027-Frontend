"use client";

import { NavbarDesign } from "@/components/navbar/Design";
import { useScrollPosition } from "@/hooks/useScrollPosition";

/**
 * Navbar
 *
 * A single, page-level fixed navbar that:
 * 1. Is hidden while Hero, ProNites, and FestivalVibes sections are on screen
 * 2. Reveals once the user scrolls past 85% of viewport height
 * 3. Hides again when near the footer
 *
 * Uses useScrollPosition hook for smart throttling and mobile-aware thresholds.
 */
export function Navbar() {
  const { visible } = useScrollPosition({
    showAfterPercent: 3.7, // Show after scrolling ~4x viewport (when BanarasiVibes is in view)
    hideBeforeBottomPercent: 1.5, // Hide when 1.5x viewport from bottom (desktop)
    hideBeforeBottomPercentMobile: 0.5, // Hide when 0.5x viewport from bottom (mobile)
  });

  return (
    <div
      className="fixed inset-x-0 top-0 z-[200]"
      style={{
        transform: visible
          ? "translateY(0) translateZ(0)"
          : "translateY(-120%) translateZ(0)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        willChange: "transform, opacity",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        backfaceVisibility: "hidden",
      }}
      aria-hidden={!visible}
    >
      <NavbarDesign position="relative" topOffset={18} />
    </div>
  );
}
