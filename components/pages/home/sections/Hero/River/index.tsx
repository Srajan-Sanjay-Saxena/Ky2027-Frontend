"use client";

import { forwardRef } from "react";
import { Z_HERO } from "@/components/pages/home/constants";
import { Water } from "./water";
import { Stones } from "./stone/Stones";
import { Lotuses } from "./lotus/Lotuses";
import { Diyas } from "./diya/Diyas";
import { Boats } from "./boat/Boats";

interface RiverProps {
  className?: string;
}

/**
 * River Section - Contains all river elements
 *
 * Structure:
 * - Water (base layer with ripple animation)
 * - Lotuses (floating lotus flowers)
 * - Diyas (floating oil lamps)
 * - Boats (moving boats - desktop only)
 * - Stones (stepping stone navigation)
 *
 * All elements use individual z-indexes from constants for proper layering
 */
export const River = forwardRef<HTMLDivElement, RiverProps>(function River(
  { className = "" },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`absolute bottom-0 left-0 right-0 h-[32vh] sm:h-[30vh] md:h-[32vh] ${className}`}
      style={{
        zIndex: Z_HERO.RIVER,
        background:
          "linear-gradient(180deg, #1a4a6e 0%, #15405c 20%, #12354d 40%, #0f2a3e 60%, #0c2030 80%, #081520 100%)",
      }}
    >
      {/* Water surface with ripples - desktop only */}
      <Water className="hidden sm:block w-full h-full" />

      {/* Simple still water for mobile */}
      <div className="sm:hidden absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[30%] h-[40%]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(200,220,255,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* River elements - each manages its own z-index */}
      <Lotuses />
      <Diyas />
      <Boats />
      <Stones />
    </div>
  );
});
