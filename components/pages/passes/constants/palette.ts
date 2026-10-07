/**
 * Passes Section Palette Constants
 *
 * Section-local theming that doesn't belong in the global palette.
 * Currently just z-index layering; add section-specific overrides here.
 */

/**
 * Z-index layering for Passes section internal elements.
 * These are relative to the section, not the page.
 */
export const Z_INDEX = {
  background: 0,
  pattern: 1,
  mandala: 2,
  particles: 3,
  cards: 10,
  popularBadge: 15,
  heading: 20,
  topBorder: 25,
} as const;

// ═══════════════════════════════════════════════════════════════════
// BASE COLORS (section-local copy, independent of home palette)
// ═══════════════════════════════════════════════════════════════════

export const COLORS = {
  // Primary palette
  SAFFRON: "#FF6B00",
  GOLD: "#D4A853",
  BRIGHT_GOLD: "#FFD700",
  DARK_GOLD: "#8B6914",
  DARKER_GOLD: "#4a3510",
  GOLD_BROWN: "#B8860B",
  MAROON: "#8B1538",
  DARK_MAROON: "#5a0f25",
  ROYAL_MAROON: "#6B1328",
  DEEP_MAROON: "#3d0a18",

  // Neutrals
  CREAM: "#FDF6E3",
  STONE: "#D4B896",
  DARK_BROWN: "#2D1810",
  LAVENDER: "#9D8CD9",

  // Blues
  GANGA_BLUE: "#1A5F7A",
  DEEP_NIGHT: "#1A1A2E",
  MIDNIGHT: "#0a0a15",

  // River blues
  RIVER_SURFACE: "#1a4a6e",
  RIVER_MID: "#15405c",
  RIVER_DEEP: "#0c2030",

  // Background colors
  BG_DEEP: "#0a0612",

  // Card backgrounds
  CARD_DARK_PURPLE: "#1A0A1A",
  CARD_FRAME_DARK: "#1a0d10",
  CARD_FRAME_MID: "#2a1a18",
} as const;

// ═══════════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════════

export const SHADOWS = {
  /** Royal card shadow with purple glow and gold border hint */
  CARD_ROYAL: "0 10px 40px rgba(74, 26, 85, 0.5), 0 0 0 1px rgba(212, 168, 83, 0.2)",
  CARD_ROYAL_HOVER: "0 20px 60px rgba(74, 26, 85, 0.6), 0 0 30px rgba(212, 168, 83, 0.3)",
  /** Badge shadow */
  BADGE_GOLD: "0 4px 20px rgba(212, 168, 83, 0.6)",
  /** Button shadow */
  BUTTON_GOLD: "0 4px 15px rgba(212, 168, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
  /** QR frame shadow */
  QR_FRAME: "0 0 15px rgba(212, 168, 83, 0.2), inset 0 0 10px rgba(0,0,0,0.3)",
} as const;

// ═══════════════════════════════════════════════════════════════════
// TEXT GRADIENTS (for WebkitBackgroundClip text effects)
// ═══════════════════════════════════════════════════════════════════

/** Gold heading text gradient - use with WebkitBackgroundClip: "text" */
export const GRADIENT_TEXT_GOLD = {
  background: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.BRIGHT_GOLD} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

/** Gold price text gradient - vertical */
export const GRADIENT_TEXT_GOLD_VERTICAL = {
  background: `linear-gradient(180deg, ${COLORS.BRIGHT_GOLD} 0%, ${COLORS.GOLD} 50%, ${COLORS.BRIGHT_GOLD} 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

// ═══════════════════════════════════════════════════════════════════
// BADGE & BUTTON GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Popular badge gold gradient */
export const GRADIENT_BADGE_GOLD = `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 100%)`;

/** Royal button gradient - vertical gold to brown */
export const GRADIENT_BUTTON_ROYAL = `linear-gradient(180deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_BROWN} 50%, ${COLORS.DARK_GOLD} 100%)`;

// ═══════════════════════════════════════════════════════════════════
// CARD FRAME GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Outer gold frame gradient */
export const GRADIENT_FRAME_GOLD = `linear-gradient(180deg, ${COLORS.DARKER_GOLD} 0%, ${COLORS.DARK_GOLD} 10%, ${COLORS.GOLD} 25%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 75%, ${COLORS.DARK_GOLD} 90%, ${COLORS.DARKER_GOLD} 100%)`;

/** Inner dark frame gradient */
export const GRADIENT_FRAME_DARK = `linear-gradient(180deg, ${COLORS.CARD_FRAME_DARK} 0%, ${COLORS.CARD_FRAME_MID} 50%, ${COLORS.CARD_FRAME_DARK} 100%)`;

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE LINE GRADIENTS
// ═══════════════════════════════════════════════════════════════════

/** Horizontal decorative line - fade in from left */
export const GRADIENT_LINE_GOLD_LEFT = `linear-gradient(90deg, transparent, ${COLORS.GOLD})`;

/** Horizontal decorative line - fade out to right */
export const GRADIENT_LINE_GOLD_RIGHT = `linear-gradient(90deg, ${COLORS.GOLD}, transparent)`;

/** Border image gradient for ornate borders */
export const GRADIENT_BORDER_ORNATE = `linear-gradient(90deg, transparent 0%, ${COLORS.DARK_GOLD} 15%, ${COLORS.GOLD} 30%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 70%, ${COLORS.DARK_GOLD} 85%, transparent 100%)`;
