"use client";

import { JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import {
  HeroSection,
  LegacySection,
  StatsSection,
  EssenceSection,
  VisionSection,
  CTASection,
} from ".";

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════
export function AboutPageContent() {
  return (
    <>
      {/* Fixed navbar - always visible (matches events/passes internal pages) */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-20 sm:pt-24"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${JAZZ_COLORS.BG_ROYAL} 10%,
            ${JAZZ_COLORS.BG_WINE} 30%,
            ${JAZZ_COLORS.BG_ROYAL} 50%,
            ${JAZZ_COLORS.BG_WINE} 70%,
            ${JAZZ_COLORS.BG_ROYAL} 90%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        <HeroSection />
        <LegacySection />
        <StatsSection />
        <EssenceSection />
        <VisionSection />
        <CTASection />
      </main>
    </>
  );
}
