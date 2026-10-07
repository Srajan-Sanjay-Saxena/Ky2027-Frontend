"use client";

import { LightNavbar } from "@/components/navbar/Navbar";
import type { EventCategory } from "@/lib/api/helper/types";
import { JAZZ_COLORS } from "../constants/palette";
import { SubEventCard, CategoryHeader } from "../components";

// ═══════════════════════════════════════════════════════════════════
// CATEGORY PAGE CONTENT
// Individual category page showing all sub-events
// ═══════════════════════════════════════════════════════════════════

interface CategoryPageContentProps {
  category: EventCategory;
}

export function CategoryPageContent({ category }: CategoryPageContentProps) {
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
            ${JAZZ_COLORS.BG_ROYAL} 30%,
            ${category.color}08 50%,
            ${JAZZ_COLORS.BG_ROYAL} 70%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background glow for category color */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 30%, ${category.color} 0%, transparent 60%)
            `,
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <CategoryHeader category={category} />

          {/* Sub-events grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.subEvents.map((event, index) => (
              <SubEventCard
                key={event.id}
                event={event}
                categoryColor={category.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
