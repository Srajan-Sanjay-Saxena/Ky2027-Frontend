"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// CORNER ORNAMENTS FOR CARDS (shared)
// ═══════════════════════════════════════════════════════════════════
export const CornerOrnaments = memo(function CornerOrnaments() {
  return (
    <>
      <div className="absolute -top-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60">
        <Image src={IMAGES.contact.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 -scale-x-100">
        <Image src={IMAGES.contact.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 -scale-y-100">
        <Image src={IMAGES.contact.cornerOrnament} alt="" fill className="object-contain" />
      </div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none opacity-60 scale-[-1]">
        <Image src={IMAGES.contact.cornerOrnament} alt="" fill className="object-contain" />
      </div>
    </>
  );
});
