"use client";

import { COLORS } from "../../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND EFFECTS
// ═══════════════════════════════════════════════════════════════════

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Gradient orbs - green theme */}
      <div
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{ background: COLORS.NEON_GREEN }}
      />
      <div
        className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{ background: COLORS.NEON_CYAN }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-8 blur-[150px]"
        style={{ background: COLORS.NEON_LIME }}
      />

      {/* Grid overlay - green tint */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.NEON_GREEN}20 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.NEON_GREEN}20 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
