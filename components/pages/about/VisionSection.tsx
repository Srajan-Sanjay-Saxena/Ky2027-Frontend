"use client";

import { memo } from "react";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";

// ═══════════════════════════════════════════════════════════════════
// VISION PILLARS SECTION
// ═══════════════════════════════════════════════════════════════════
const pillars = [
  {
    title: "Culture",
    description:
      "Celebrating the rich tapestry of Indian arts — classical dance, music, theatre, and visual arts that have flourished for millennia.",
    icon: "🎭",
  },
  {
    title: "Unity",
    description:
      "Bringing together students from across India, fostering friendships and collaborations that transcend boundaries.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    description:
      "A platform for talented individuals to showcase their skills, compete with the best, and achieve recognition.",
    icon: "⭐",
  },
];

export const VisionSection = memo(function VisionSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12 text-center"
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.BRIGHT_GOLD,
            textShadow: "0 2px 20px rgba(255,215,0,0.3)",
          }}
        >
          Our Vision
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="relative p-6 sm:p-8 rounded-2xl text-center group"
              style={{
                background: `linear-gradient(160deg, ${JAZZ_COLORS.BG_ROYAL} 0%, ${JAZZ_COLORS.BG_WINE}80 100%)`,
                border: `2px solid ${COLORS.BRIGHT_GOLD}25`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <CornerOrnaments />

              <span className="text-4xl sm:text-5xl mb-4 block">
                {pillar.icon}
              </span>

              <h3
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{
                  color: COLORS.BRIGHT_GOLD,
                  fontFamily: "Georgia, serif",
                }}
              >
                {pillar.title}
              </h3>

              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
