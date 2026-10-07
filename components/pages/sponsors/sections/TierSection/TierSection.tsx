"use client";

import { COLORS } from "../../constants/palette";
import { type Sponsor, type SponsorTier } from "../../config/sponsors.config";
import { SponsorCard } from "../SponsorCard/SponsorCard";

// ═══════════════════════════════════════════════════════════════════
// TIER SECTION
// ═══════════════════════════════════════════════════════════════════

export function TierSection({
  title,
  sponsors,
  tier,
}: {
  title: string;
  sponsors: Sponsor[];
  tier: SponsorTier;
}) {
  if (sponsors.length === 0) return null;

  const neonColor =
    tier === "title"
      ? COLORS.NEON_PINK
      : tier === "major"
        ? COLORS.NEON_CYAN
        : tier === "co-title"
          ? COLORS.NEON_PURPLE
          : COLORS.NEON_LIME;

  return (
    <div className="mb-16">
      {/* Tier title */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <div
          className="h-[2px] w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${neonColor})`,
          }}
        />
        <h3
          className="text-lg font-bold tracking-[0.2em] uppercase sm:text-xl"
          style={{
            color: neonColor,
            textShadow: `0 0 20px ${neonColor}60`,
          }}
        >
          {title}
        </h3>
        <div
          className="h-[2px] w-16 sm:w-24"
          style={{
            background: `linear-gradient(90deg, ${neonColor}, transparent)`,
          }}
        />
      </div>

      {/* Sponsors grid */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
