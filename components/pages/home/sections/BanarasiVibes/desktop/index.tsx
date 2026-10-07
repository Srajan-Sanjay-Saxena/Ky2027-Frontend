"use client";

import { memo, RefObject } from "react";
import { RotatingMandala } from "./RotatingMandala";
import { Rickshaw } from "./Rickshaw";

interface BanarasiVibesDesktopProps {
  isAnimating: boolean;
  shouldAnimate: boolean;
  rickshawRef?: RefObject<HTMLDivElement | null>;
}

/**
 * Desktop-only elements for BanarasiVibes section
 * Shows: Rotating Mandala, Rickshaw
 * Hidden on mobile (< 640px)
 */
export const BanarasiVibesDesktop = memo(function BanarasiVibesDesktop({
  isAnimating,
  shouldAnimate,
  rickshawRef,
}: BanarasiVibesDesktopProps) {
  return (
    <>
      {/* Rotating Mandala backdrop */}
      <RotatingMandala isAnimating={isAnimating} shouldAnimate={shouldAnimate} />

      {/* Rickshaw - animated */}
      <Rickshaw ref={rickshawRef} />
    </>
  );
});
