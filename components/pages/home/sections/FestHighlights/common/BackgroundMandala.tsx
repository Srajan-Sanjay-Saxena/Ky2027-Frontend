"use client";

import { memo } from "react";
import { MandalaRing } from "./MandlaRing";

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND MANDALA — slowly spinning mandala backdrop
// (pauses when the section is out of view via isAnimating)
// ═══════════════════════════════════════════════════════════════════
export const BackgroundMandala = memo(function BackgroundMandala({
  isAnimating,
}: {
  isAnimating: boolean;
}) {
  return (
    /* Background Mandala - smaller on mobile */
    <div
      className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] pointer-events-none opacity-15"
      style={{ animation: isAnimating ? "spin 60s linear infinite" : "none" }}
    >
      <MandalaRing className="w-full h-full text-[#FF6B00]" />
    </div>
  );
});
