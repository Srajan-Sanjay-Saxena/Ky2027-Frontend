"use client";

import { ThemedNavbar } from "@/components/navbar/ThemedNavbar";
import type { NavbarTheme, NavPositionType } from "@/components/navbar/types/navbar.types";

type LightNavbarProps = {
  className?: string;
  position?: NavPositionType;
  topOffset?: number;
  theme?: NavbarTheme;
};

/**
 * LightNavbar - Page-level navbar wrapper.
 *
 * Used on standalone content pages (about, contact, passes, etc.) that render
 * the navbar in a `relative` position rather than the scroll-aware default.
 * It delegates rendering to {@link ThemedNavbar} while remaining a distinct,
 * explicitly-exported component so page call sites stay stable.
 */
export function LightNavbar(props: LightNavbarProps) {
  return <ThemedNavbar {...props} />;
}
