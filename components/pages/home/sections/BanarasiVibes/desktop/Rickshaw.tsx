"use client";

import { memo, RefObject } from "react";
import { IMAGES } from "@/lib/images";

interface RickshawProps {
  ref?: RefObject<HTMLDivElement | null>;
}

export const Rickshaw = memo(function Rickshaw({ ref }: RickshawProps) {
  return (
    <div
      ref={ref}
      className="pointer-events-none hidden sm:absolute sm:block sm:h-[230px] sm:w-[380px]"
      style={{
        left: "-200px",
        bottom: "5px",
        zIndex: 40,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGES.vibes.rickshaw}
        alt="Auto Rickshaw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          // warm sunset grade so the auto sits in the scene's lighting
          filter:
            "brightness(0.82) sepia(0.3) saturate(1.15) hue-rotate(-8deg) drop-shadow(0 10px 8px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(255,140,40,0.25))",
        }}
      />
    </div>
  );
});
