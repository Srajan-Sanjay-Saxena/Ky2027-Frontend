"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ThemedNavbar } from "@/components/navbar";
import { IMAGES } from "@/lib/images";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/sponsors/constants/palette";
import {
  SPONSORS_2026,
  groupSponsorsByTier,
} from "@/components/pages/sponsors/config/sponsors.config";
import {
  LeftSideDecor,
  RightSideDecor,
  BackgroundEffects,
  FloatingElements,
  Bitcoin3D,
} from "./decor";
import { TierSection } from "./TierSection/TierSection";

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════

export function SponsorsPageContent() {
  const groupedSponsors = groupSponsorsByTier(SPONSORS_2026);

  return (
    <>
      {/* Navbar - Sponsor theme (green/gold nature) */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <ThemedNavbar position="relative" topOffset={18} theme="sponsor" />
      </div>

      <main
        className="relative min-h-screen px-4 pt-28 pb-16 sm:pt-32"
        style={{
          background: GRADIENTS.PAGE_BG,
        }}
      >
        {/* Background effects */}
        <BackgroundEffects />

        {/* 3D Bitcoin - scroll controlled */}
        <Bitcoin3D />

        {/* Floating elements */}
        <FloatingElements />

        {/* Side decorations - Desktop */}
        <LeftSideDecor />
        <RightSideDecor />

        {/* Tree branch decoration - Desktop (Left only) */}
        <div className="pointer-events-none fixed -top-12 left-0 z-20 hidden lg:block">
          <Image
            src={IMAGES.sponsors.leftTreeBranch}
            alt=""
            width={1000}
            height={1200}
            className="w-[480px] opacity-90"
            style={{
              filter: SHADOWS.BRANCH_GLOW,
            }}
          />
        </div>

        {/* Sponsor Presenter - Bottom Right (flipped to point left) */}
        <div className="pointer-events-none fixed right-[-300] bottom-0 z-20 hidden lg:block">
          <Image
            src={IMAGES.sponsors.sponsorPresentor}
            alt=""
            width={1200}
            height={1400}
            className="w-[950px] opacity-90"
            style={{
              filter: SHADOWS.BRANCH_GLOW,
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Page Header */}
          <motion.div
            className="mb-16 text-center sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative top element */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div
                className="h-[2px] w-16 sm:w-24"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.NEON_CYAN})`,
                }}
              />
              <span className="text-2xl">⚡</span>
              <div
                className="h-[2px] w-16 sm:w-24"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.NEON_CYAN}, transparent)`,
                }}
              />
            </div>

            {/* Title with gradient */}
            <h1
              className="mb-8 text-4xl font-black tracking-tight sm:text-5xl md:text-7xl"
              style={{
                fontFamily: "var(--font-cinzel-decorative), 'Cinzel Decorative', serif",
                background: GRADIENTS.TITLE,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: SHADOWS.TITLE_DROP,
              }}
            >
              OUR PARTNERS
            </h1>

            {/* Decorative divider */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div
                className="h-[1px] w-16 sm:w-24"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS.NEON_PINK})` }}
              />
              <span
                className="text-xl"
                style={{
                  color: COLORS.NEON_PINK,
                  textShadow: `0 0 15px ${COLORS.NEON_PINK}`,
                }}
              >
                ✦
              </span>
              <div
                className="h-[1px] w-16 sm:w-24"
                style={{ background: `linear-gradient(90deg, ${COLORS.NEON_PINK}, transparent)` }}
              />
            </div>

            {/* Tagline badges - improved styling */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
              {["POWERED BY", "SUPPORTED BY", "ENABLED BY"].map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full px-5 py-2 text-xs font-bold tracking-[0.15em] transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${[COLORS.NEON_CYAN, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i]}20 0%, transparent 100%)`,
                    border: `1.5px solid ${[COLORS.NEON_CYAN, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i]}60`,
                    color: [COLORS.NEON_CYAN, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i],
                    boxShadow: `0 0 20px ${[COLORS.NEON_CYAN, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i]}20`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Subtitle - improved typography */}
            <div className="mx-auto mb-10 max-w-2xl px-4">
              <p
                className="text-center text-base leading-relaxed sm:text-lg"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Kashi Yatra 2027 partners will be announced soon.
              </p>
              <p
                className="mt-2 text-center text-base leading-relaxed sm:text-lg"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Below are the amazing brands who made our previous edition{" "}
                <span
                  className="font-bold"
                  style={{
                    background: GRADIENTS.PINK_PURPLE,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  legendary
                </span>
                .
              </p>
            </div>

            {/* Coming soon badge - enhanced */}
            <motion.div
              className="inline-block rounded-2xl px-8 py-4"
              style={{
                background: `linear-gradient(135deg, ${COLORS.NEON_PINK}15, ${COLORS.NEON_PURPLE}15, ${COLORS.NEON_CYAN}15)`,
                border: `2px solid transparent`,
                borderImage: `linear-gradient(135deg, ${COLORS.NEON_PINK}60, ${COLORS.NEON_PURPLE}60, ${COLORS.NEON_CYAN}60) 1`,
              }}
              animate={{
                boxShadow: [
                  `0 0 20px ${COLORS.NEON_PINK}20, 0 0 40px ${COLORS.NEON_PURPLE}10`,
                  `0 0 30px ${COLORS.NEON_PINK}40, 0 0 60px ${COLORS.NEON_PURPLE}20`,
                  `0 0 20px ${COLORS.NEON_PINK}20, 0 0 40px ${COLORS.NEON_PURPLE}10`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span
                className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase sm:text-base"
                style={{
                  background: GRADIENTS.PINK_PURPLE,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <span className="text-lg">🚀</span>
                2027 Partners Coming Soon
                <span className="text-lg">✨</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Previous Edition Section */}
          <div className="mb-8">
            <div className="mb-12 flex items-center justify-center gap-3">
              <span
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, transparent, ${COLORS.NEON_PURPLE}60)`,
                }}
              />
              <h2
                className="text-sm font-bold tracking-[0.3em] uppercase"
                style={{ color: COLORS.NEON_PURPLE }}
              >
                Previous Edition Partners
              </h2>
              <span
                className="h-px w-20 sm:w-32"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.NEON_PURPLE}60, transparent)`,
                }}
              />
            </div>

            {/* Tier Sections */}
            <TierSection title="Title Sponsor" sponsors={groupedSponsors["title"]} tier="title" />
            <TierSection title="Major Sponsor" sponsors={groupedSponsors["major"]} tier="major" />
            <TierSection title="Co-Title" sponsors={groupedSponsors["co-title"]} tier="co-title" />
            <TierSection
              title="Powered By"
              sponsors={groupedSponsors["powered-by"]}
              tier="powered-by"
            />
            <TierSection
              title="Co-Powered By"
              sponsors={groupedSponsors["co-powered-by"]}
              tier="co-powered-by"
            />
            <TierSection title="Partners" sponsors={groupedSponsors["partner"]} tier="partner" />
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <span
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.NEON_CYAN}40)`,
              }}
            />
            <span className="text-2xl">🎉</span>
            <span
              className="h-px w-20"
              style={{
                background: `linear-gradient(90deg, ${COLORS.NEON_CYAN}40, transparent)`,
              }}
            />
          </div>

          {/* Footer text */}
          <p
            className="mt-6 text-center text-sm tracking-wider"
            style={{ color: `${COLORS.NEON_PURPLE}80` }}
          >
            IIT (BHU) Varanasi • Kashi Yatra 2027
          </p>
        </div>
      </main>
    </>
  );
}
