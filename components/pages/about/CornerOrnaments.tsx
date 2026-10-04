"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// CORNER ORNAMENTS FOR CARDS
// ═══════════════════════════════════════════════════════════════════
export const CornerOrnaments = memo(function CornerOrnaments() {
  return (
    <>
      {/* Top-left */}
      <div className="absolute -top-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Top-right */}
      <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 -scale-x-100">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Bottom-left */}
      <div className="absolute -bottom-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 -scale-y-100">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      {/* Bottom-right */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 scale-[-1]">
        <Image src={IMAGES.about.cornerOrnament} alt="" fill className="object-contain" />
      </div>
    </>
  );
});
