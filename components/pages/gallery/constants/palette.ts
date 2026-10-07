// ═══════════════════════════════════════════════════════════════════
// GALLERY PAGE COLOR PALETTE
//
// Self-contained color definitions for the Gallery page. Kept in sync
// with the festival theme (saffron / gold / maroon on deep night
// backgrounds) used across the app so the Gallery page does not depend
// on the home palette.
//
// NOTE: The Gallery page content is not yet implemented; these are the
// baseline tokens for the shared festival look used by sibling pages.
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Deep backgrounds
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#150a14",
  BG_WINE: "#1f0c18",

  // Primary palette
  SAFFRON: "#FF6B00",
  GOLD: "#D4A853",
  BRIGHT_GOLD: "#FFD700",
  GOLD_DARK: "#8B6914",

  // Maroons
  MAROON: "#8B1538",
  DARK_MAROON: "#5a0f25",
  DEEP_MAROON: "#3d0a18",

  // Neutrals
  CREAM: "#FDF6E3",
  IVORY: "#FFFFF0",
  WHITE: "#FFFFFF",
} as const;

// ═══════════════════════════════════════════════════════════════════
// GRADIENTS
// ═══════════════════════════════════════════════════════════════════

export const GRADIENTS = {
  // Page background (top → middle → top)
  PAGE_BG: `linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)`,

  // Gold headline gradient
  TITLE: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.SAFFRON} 100%)`,

  // Divider accent
  DIVIDER: `linear-gradient(90deg, transparent, ${COLORS.GOLD}, transparent)`,
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS / GLOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  CARD: "0 4px 20px rgba(0,0,0,0.4)",
  GOLD_GLOW: `0 0 20px ${COLORS.GOLD}40`,
  TITLE_DROP: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
} as const;

export type GalleryColor = keyof typeof COLORS;
