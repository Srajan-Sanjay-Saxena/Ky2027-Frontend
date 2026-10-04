"use client";

import { memo } from "react";
import {
  COLORS,
  JAZZ_COLORS,
  GRADIENT_TEXT_GOLD,
} from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";

// ═══════════════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════════════
const stats = [
  { value: "15+", label: "Years of Legacy", icon: "🏛️" },
  { value: "90K+", label: "Expected Footfall", icon: "👥" },
  { value: "50+", label: "Events", icon: "🎭" },
  { value: "100+", label: "Colleges", icon: "🎓" },
];

export const StatsSection = memo(function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-[2px] transition-transform duration-500 hover:-translate-y-1.5"
              style={{
                // Ornate gold frame (outer border as a gradient)
                background: `linear-gradient(160deg, ${COLORS.DARKER_GOLD} 0%, ${COLORS.GOLD} 20%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 80%, ${COLORS.DARKER_GOLD} 100%)`,
                boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 30px ${COLORS.BRIGHT_GOLD}18`,
              }}
            >
              {/* Inner royal card */}
              <div
                className="relative overflow-hidden rounded-2xl px-4 py-6 sm:px-6 sm:py-8 text-center"
                style={{
                  background: `linear-gradient(165deg, ${COLORS.DEEP_MAROON} 0%, ${JAZZ_COLORS.BG_WINE} 45%, ${COLORS.DARK_MAROON} 100%)`,
                }}
              >
                {/* Corner flourishes */}
                <CornerOrnaments />

                {/* Radial glow that intensifies on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 sm:group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${COLORS.BRIGHT_GOLD}22 0%, transparent 60%)`,
                  }}
                />

                {/* Icon in a gold-ringed medallion */}
                <div className="relative flex justify-center mb-4">
                  <div
                    className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.DEEP_MAROON} 0%, ${COLORS.DARK_MAROON} 100%)`,
                      border: `1.5px solid ${COLORS.BRIGHT_GOLD}70`,
                      boxShadow: `inset 0 0 12px rgba(0,0,0,0.5), 0 0 16px ${COLORS.BRIGHT_GOLD}30`,
                    }}
                  >
                    <span className="text-2xl sm:text-3xl">{stat.icon}</span>
                  </div>
                </div>

                {/* Value - gold gradient text */}
                <p
                  className="relative text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
                  style={{
                    ...GRADIENT_TEXT_GOLD,
                    fontFamily: "Georgia, serif",
                    textShadow: `0 2px 20px ${COLORS.BRIGHT_GOLD}30`,
                  }}
                >
                  {stat.value}
                </p>

                {/* Ornate divider */}
                <div className="relative flex items-center justify-center gap-1.5 my-2.5">
                  <span
                    className="h-px w-6 sm:w-8"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD}90)`,
                    }}
                  />
                  <span
                    className="text-[10px]"
                    style={{ color: COLORS.BRIGHT_GOLD }}
                  >
                    ◆
                  </span>
                  <span
                    className="h-px w-6 sm:w-8"
                    style={{
                      background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}90, transparent)`,
                    }}
                  />
                </div>

                {/* Label */}
                <p
                  className="relative text-[11px] sm:text-sm uppercase tracking-[0.15em] font-semibold"
                  style={{ color: COLORS.CREAM, opacity: 0.75 }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
