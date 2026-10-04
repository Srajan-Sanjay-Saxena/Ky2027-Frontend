"use client";

import { memo } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

// ═══════════════════════════════════════════════════════════════════
// GODDESS DURGA — divine presence: auras, sacred ring, particles,
// the Durga image, and bottom glow (sits behind content on desktop)
// ═══════════════════════════════════════════════════════════════════
export const GoddessDurga = memo(function GoddessDurga() {
  return (
    /* GODDESS DURGA - Divine presence - BEHIND content, hidden on mobile */
    <div className="hidden sm:block absolute right-0 bottom-0 w-[40%] md:w-[35%] lg:w-[30%] xl:w-[28%] pointer-events-none z-[5]">
      {/* Divine aura behind Durga */}
      <div
        className="absolute inset-[-30%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,0,0.15) 0%, rgba(176,63,35,0.08) 40%, transparent 70%)",
          animation: "durgaAura 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-[-15%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,0,0.12) 0%, rgba(255,140,0,0.06) 40%, transparent 70%)",
          animation: "durgaAura 3s ease-in-out infinite reverse",
        }}
      />

      {/* Rotating sacred ring */}
      <div
        className="absolute inset-[-20%] rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(255,215,0,0.1)",
          animation: "rotateDurga 25s linear infinite",
        }}
      />

      {/* Divine particles around Durga - Desktop only */}
      <div className="hidden sm:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={`durga-particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              left: `${10 + (i % 5) * 20}%`,
              top: `${10 + Math.floor(i / 5) * 30}%`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #FFD700 0%, transparent 70%)"
                  : "radial-gradient(circle, #FF4500 0%, transparent 70%)",
              animation: `floatParticle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: "0 0 8px rgba(255,215,0,0.6)",
            }}
          />
        ))}
      </div>

      <Image
        src={IMAGES.highlights.durga}
        alt="Goddess Durga"
        width={800}
        height={1000}
        className="w-full h-auto relative"
        style={{
          filter:
            "drop-shadow(0 0 30px rgba(255,69,0,0.5)) drop-shadow(0 0 60px rgba(255,215,0,0.3))",
          animation: "durgaShimmer 4s ease-in-out infinite",
        }}
        priority
      />

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[15%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,140,0,0.4) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
});
