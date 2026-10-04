"use client";

import { memo } from "react";
import { COLORS } from "@/components/pages/home/constants/palette";
import { MysticDivider } from "./MysticDivider";

// ═══════════════════════════════════════════════════════════════════
// SCHEDULE HERO
// Same visual language as ContactHero: golden eyebrow, gold-gradient
// italic serif title, tagline, and a mystic divider.
// ═══════════════════════════════════════════════════════════════════
export const ScheduleHero = memo(function ScheduleHero() {
  return (
    <section className="relative min-h-[46vh] sm:min-h-[52vh] flex flex-col items-center justify-center overflow-hidden pt-6">
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
            14th–17th January 2027
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
          The Schedule
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-8"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Four days of </span>
          <span
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: "0 0 20px rgba(255,215,0,0.4)",
            }}
          >
            music
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>, art and </span>
          <span
            style={{
              color: COLORS.SAFFRON,
              textShadow: "0 0 20px rgba(255,107,0,0.4)",
            }}
          >
            celebration
          </span>
        </p>

        <MysticDivider />
      </div>
    </section>
  );
});
