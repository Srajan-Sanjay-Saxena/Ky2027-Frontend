// ═══════════════════════════════════════════════════════════════════
// SPONSORS PAGE COLOR PALETTE
// Gen-Z concert theme — greenish-white neon stage lights
//
// Self-contained color definitions for the Sponsors page. These mirror
// the colors currently used inline in SponsorsPageContent.tsx so the
// page does not depend on the home palette.
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Deep backgrounds
  BG_DEEP: "#030308",
  BG_PURPLE: "#050a08",

  // Neon accent palette (green-forward concert theme)
  NEON_CYAN: "#00FFAA", // Mint / teal green
  NEON_PINK: "#00FF88", // Bright green (named pink for structural parity)
  NEON_PURPLE: "#88FFCC", // Light mint
  NEON_LIME: "#BFFF00", // Lime green
  NEON_GREEN: "#00FF66", // Pure neon green

  // Supporting
  GOLD: "#CCFFCC", // Pale green-white
  WHITE: "#FFFFFF",
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS - recurring background / headline gradients
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Page background (top → middle → top)
  PAGE_BG: `linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_PURPLE} 50%, ${COLORS.BG_DEEP} 100%)`,

  // Multi-stop headline title gradient
  TITLE: `linear-gradient(135deg, ${COLORS.WHITE} 0%, ${COLORS.NEON_CYAN} 25%, ${COLORS.WHITE} 50%, ${COLORS.NEON_PINK} 75%, ${COLORS.WHITE} 100%)`,

  // Pink → purple accent used in inline text highlights
  PINK_PURPLE: `linear-gradient(90deg, ${COLORS.NEON_PINK}, ${COLORS.NEON_PURPLE})`,

  // Stage curtain (dark green drape)
  CURTAIN: "linear-gradient(90deg, #004d33 0%, #002d1a 50%, #001a0d 100%)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS / GLOWS - neon glow helpers
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  LIGHT_FIXTURE: "0 4px 15px rgba(0,0,0,0.5)",
  LOGO_CARD: "0 2px 8px rgba(0,0,0,0.15)",
  TITLE_DROP: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  BRANCH_GLOW: "drop-shadow(0 0 15px rgba(0,255,100,0.3))",
} as const;

export type SponsorColor = keyof typeof COLORS;
