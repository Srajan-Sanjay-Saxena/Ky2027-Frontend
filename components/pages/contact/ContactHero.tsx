"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/home/constants/palette";
import { MysticDivider } from "./MysticDivider";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════
export const ContactHero = memo(function ContactHero() {
  return (
    <section className="relative min-h-[52vh] sm:min-h-[58vh] flex flex-col items-center justify-center overflow-hidden pt-6">
      {/* Golden Conch (Shankha) centerpiece */}
      <div className="relative mb-2 sm:mb-4">
        {/* Radiant halo behind the conch */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,180,50,0.12) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div className="relative w-[240px] sm:w-[360px] md:w-[420px] aspect-[1420/770] lg:animate-[floatOm_6s_ease-in-out_infinite]">
          <Image
            src={IMAGES.contact.conch}
            alt="Sacred golden conch"
            fill
            priority
            className="object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(255,215,0,0.5)) drop-shadow(0 0 48px rgba(255,150,50,0.25))",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
            }}
          />
          <span className="text-lg sm:text-xl">🪔</span>
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] font-bold"
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 0 20px rgba(255,215,0,0.5)",
            }}
          >
            We Would Love To Hear From You
          </p>
          <span className="text-lg sm:text-xl">🪔</span>
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic mb-6"
          style={{
            fontFamily: "Georgia, serif",
            background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 40%, ${COLORS.GOLD} 60%, ${COLORS.CREAM} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 30px rgba(255,215,0,0.3)",
          }}
        >
          Get In Touch
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-8"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Let your </span>
          <span
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 0 20px rgba(255,215,0,0.4)",
            }}
          >
            words
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            {" "}
            travel down the{" "}
          </span>
          <span
            style={{
              color: COLORS.SAFFRON,
              textShadow: "0 0 20px rgba(255,107,0,0.4)",
            }}
          >
            Ganga
          </span>
        </p>

        <MysticDivider />
      </div>
    </section>
  );
});
