"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";

export const VerticalNeonText = memo(function VerticalNeonText() {
  return (
    <div
      className="pointer-events-none absolute top-0 right-4 bottom-0 hidden lg:block xl:right-8"
      style={{ zIndex: 15 }}
    >
      {/* Neon border line */}
      <div
        className="absolute top-[15%] right-0 bottom-[20%] w-1"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${CONCERT_COLORS.NEON_GOLD} 15%, ${CONCERT_COLORS.NEON_PINK} 40%, ${CONCERT_COLORS.NEON_PURPLE} 60%, ${CONCERT_COLORS.NEON_GOLD} 85%, transparent 100%)`,
          boxShadow: `0 0 20px ${CONCERT_COLORS.NEON_GOLD}, 0 0 40px ${CONCERT_COLORS.NEON_PINK}80`,
          borderRadius: "2px",
          animation: "neonBorderPulse 3s ease-in-out infinite",
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute top-[15%] right-[-4px] bottom-[20%] w-2"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${CONCERT_COLORS.NEON_GOLD}50 15%, ${CONCERT_COLORS.NEON_PINK}50 40%, ${CONCERT_COLORS.NEON_PURPLE}50 60%, ${CONCERT_COLORS.NEON_GOLD}50 85%, transparent 100%)`,
          filter: "blur(8px)",
          borderRadius: "4px",
          animation: "neonBorderPulse 3s ease-in-out infinite 0.5s",
        }}
      />

      {/* Floating Vertical Text - "PRO" */}
      <div
        className="absolute top-[22%] right-6"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          animation: "floatTextUp 4s ease-in-out infinite",
        }}
      >
        <span
          className="text-3xl font-black tracking-[0.25em] xl:text-4xl"
          style={{
            background: `linear-gradient(180deg, ${CONCERT_COLORS.NEON_GOLD}, ${CONCERT_COLORS.NEON_PINK}, ${CONCERT_COLORS.NEON_PURPLE})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_GOLD}80) drop-shadow(0 0 40px ${CONCERT_COLORS.NEON_PINK}50)`,
          }}
        >
          PRO
        </span>
      </div>

      {/* Floating Vertical Text - "NITES" */}
      <div
        className="absolute top-[45%] right-6"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          animation: "floatTextDown 4s ease-in-out infinite 0.5s",
        }}
      >
        <span
          className="text-3xl font-black tracking-[0.25em] xl:text-4xl"
          style={{
            background: `linear-gradient(180deg, ${CONCERT_COLORS.NEON_PINK}, ${CONCERT_COLORS.NEON_PURPLE}, ${CONCERT_COLORS.NEON_CYAN})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_PINK}80) drop-shadow(0 0 40px ${CONCERT_COLORS.NEON_PURPLE}50)`,
          }}
        >
          NITES
        </span>
      </div>

      {/* Pulsing light nodes */}
      {[20, 35, 50, 65, 80].map((pos, i) => (
        <div
          key={`node-${i}`}
          className="absolute right-[-3px] h-2.5 w-2.5 rounded-full"
          style={{
            top: `${pos}%`,
            background: [
              CONCERT_COLORS.NEON_GOLD,
              CONCERT_COLORS.NEON_PINK,
              CONCERT_COLORS.NEON_PURPLE,
              CONCERT_COLORS.NEON_PINK,
              CONCERT_COLORS.NEON_GOLD,
            ][i],
            boxShadow: `0 0 12px ${[CONCERT_COLORS.NEON_GOLD, CONCERT_COLORS.NEON_PINK, CONCERT_COLORS.NEON_PURPLE, CONCERT_COLORS.NEON_PINK, CONCERT_COLORS.NEON_GOLD][i]}, 0 0 24px ${[CONCERT_COLORS.NEON_GOLD, CONCERT_COLORS.NEON_PINK, CONCERT_COLORS.NEON_PURPLE, CONCERT_COLORS.NEON_PINK, CONCERT_COLORS.NEON_GOLD][i]}80`,
            animation: `pulseSlow 1.5s ease-in-out infinite ${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
});
