"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE DIVIDER (shared)
// ═══════════════════════════════════════════════════════════════════
export const MysticDivider = memo(function MysticDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative">
        {/* Golden glow behind divider - Desktop only */}
        <div
          className="hidden lg:block absolute inset-0 -inset-x-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(255,180,50,0.15) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <Image
          src={IMAGES.contact.mysticDivider}
          alt=""
          width={600}
          height={60}
          className="relative w-full max-w-[400px] sm:max-w-[550px] h-auto opacity-90"
          style={{ filter: "drop-shadow(0 0 15px rgba(255,215,0,0.4))" }}
        />
      </div>
    </div>
  );
});
