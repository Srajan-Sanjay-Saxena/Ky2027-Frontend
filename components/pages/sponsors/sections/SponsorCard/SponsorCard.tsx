"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { SHADOWS } from "@/components/pages/sponsors/constants/palette";
import {
  TIER_CONFIG,
  CARD_SIZES,
  type Sponsor,
} from "@/components/pages/sponsors/config/sponsors.config";

// ═══════════════════════════════════════════════════════════════════
// SPONSOR CARD - Stamp style design (responsive)
// ═══════════════════════════════════════════════════════════════════

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const tierConfig = TIER_CONFIG[sponsor.tier];
  const size = CARD_SIZES[tierConfig.cardSize];

  // Mobile sizes are now larger (was mobileWidth, now using bigger values)
  const mobileSizeW = Math.min(size.mobileWidth * 1.4, 340);
  const mobileSizeH = Math.min(size.mobileHeight * 1.4, 270);
  const mobileLogoSize = size.mobileLogoSize * 1.4;

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.03, rotate: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Responsive card container */}
      <div
        className="relative"
        style={{
          width: `clamp(${mobileSizeW}px, 80vw, ${size.width}px)`,
          height: `clamp(${mobileSizeH}px, 65vw, ${size.height}px)`,
        }}
      >
        {/* Stamp background image */}
        <div className="absolute inset-0">
          <Image src={IMAGES.sponsors.sponsorStamp} alt="" fill className="object-contain" />
        </div>

        {/* Content - centered on stamp */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-[8%] py-[6%]">
          {/* Logo container */}
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-lg bg-white/95"
            style={{
              width: `clamp(${mobileLogoSize}px, 35vw, ${size.logoSize}px)`,
              height: `clamp(${mobileLogoSize * 0.6}px, 22vw, ${size.logoSize * 0.6}px)`,
              padding: "4%",
              boxShadow: SHADOWS.LOGO_CARD,
            }}
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              className="object-contain p-[8%]"
              sizes={`(max-width: 640px) ${mobileLogoSize}px, ${size.logoSize}px`}
            />
          </div>

          {/* Category label */}
          <div className="mt-[4%] max-w-[85%]">
            <p
              className="text-center text-[clamp(9px,2.5vw,11px)] leading-tight font-bold tracking-[0.1em] uppercase"
              style={{
                color: "#2a4a3a",
                textShadow: "0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {sponsor.category}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
