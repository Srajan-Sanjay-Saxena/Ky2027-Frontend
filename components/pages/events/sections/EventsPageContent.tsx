"use client";

import { LightNavbar } from "@/components/navbar/Navbar";
import { EVENT_CATEGORIES } from "../config/events.config";
import { COLORS, JAZZ_COLORS } from "../constants/palette";
import { CategoryCard, PageTitle } from "../components";
import { DecorativeElements } from "./decor/DecorativeElements";

// ═══════════════════════════════════════════════════════════════════
// EVENTS PAGE CONTENT
// Main events listing page with category cards
// ═══════════════════════════════════════════════════════════════════

export function EventsPageContent() {
  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <LightNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-28 pb-20 sm:px-6 sm:pt-32"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${JAZZ_COLORS.BG_ROYAL} 20%,
            ${JAZZ_COLORS.BG_WINE} 50%,
            ${JAZZ_COLORS.BG_ROYAL} 80%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background decorative elements */}
        <DecorativeElements />

        <div className="relative z-10 mx-auto max-w-7xl">
          <PageTitle />

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {EVENT_CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 text-center sm:mt-20">
            <div
              className="inline-block rounded-full px-6 py-3 text-sm"
              style={{
                background: `${COLORS.BRIGHT_GOLD}10`,
                border: `1px solid ${COLORS.BRIGHT_GOLD}30`,
                color: COLORS.BRIGHT_GOLD,
              }}
            >
              Click on any category to explore events
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
