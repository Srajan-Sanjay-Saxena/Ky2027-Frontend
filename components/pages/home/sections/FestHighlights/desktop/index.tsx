"use client";

import { memo } from "react";
import { FloatingParticles } from "./FloatingParticles";
import { GoddessDurga } from "./GoddessDurga";

/**
 * Desktop-only elements for FestHighlights section
 * Shows: Floating Particles, Goddess Durga
 * Hidden on mobile (< 640px)
 */
export const FestHighlightsDesktop = memo(function FestHighlightsDesktop() {
  return (
    <>
      {/* Floating particles */}
      <FloatingParticles />

      {/* Goddess Durga - Divine presence */}
      <GoddessDurga />
    </>
  );
});

// Re-export individual components for backward compatibility
export { FloatingParticles } from "./FloatingParticles";
export { GoddessDurga } from "./GoddessDurga";