"use client";

import { LightNavbar } from "@/components/navbar/Navbar";
import type { EventCategory, EventCategorySlug } from "@/lib/api/helper/types";
import { useEventsByCategory, CATEGORY_METADATA } from "@/lib/api/hooks";
import { JAZZ_COLORS } from "../constants/palette";
import { SubEventCard, CategoryHeader } from "../components";
import { EventsLoader } from "./loader/EventsLoader";

// ═══════════════════════════════════════════════════════════════════
// SLUG MAPPING
// ═══════════════════════════════════════════════════════════════════

const SLUG_TO_CATEGORY: Record<string, EventCategorySlug> = {
  natraj: "NATRAJ",
  crosswindz: "CROSSWINDZ",
  bandish: "BANDISH",
  abhinay: "ABHINAY",
  mirage: "MIRAGE",
  toolika: "TOOLIKA",
  enquizta: "ENQUIZTA",
  samwaad: "SAMWAAD",
  zaika: "ZAIKA",
};

// ═══════════════════════════════════════════════════════════════════
// CATEGORY PAGE CONTENT
// Individual category page showing all sub-events
// ═══════════════════════════════════════════════════════════════════

interface CategoryPageContentProps {
  category?: EventCategory; // Legacy prop (from static config)
  categorySlug?: string; // New prop (for API-based fetching)
}

export function CategoryPageContent({
  category: legacyCategory,
  categorySlug,
}: CategoryPageContentProps) {
  // Determine which category to use
  const slug = categorySlug ?? legacyCategory?.slug;
  const categoryKey = slug ? SLUG_TO_CATEGORY[slug.toLowerCase()] : null;

  // Get category metadata first (this is synchronous)
  const categoryMeta = categoryKey ? CATEGORY_METADATA[categoryKey] : null;

  // Fetch events from API if we have a valid category key
  const { events, isLoading, isError, errorMessage } = useEventsByCategory(
    categoryKey ?? "NATRAJ" // Fallback to prevent hook error, but we check categoryKey below
  );

  // If no valid category slug provided
  if (!categoryKey || !categoryMeta) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0612]">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">Category not found</h2>
          <p className="mt-2 text-gray-400">The category &quot;{slug}&quot; does not exist.</p>
        </div>
      </div>
    );
  }

  // Loading state - show loader while fetching from API
  if (isLoading && !legacyCategory) {
    return <EventsLoader />;
  }

  // Error state
  if (isError && !legacyCategory) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0612]">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold">Failed to load events</h2>
          <p className="mt-2 text-gray-400">{errorMessage}</p>
        </div>
      </div>
    );
  }

  // Build category object from metadata + API events
  const category: EventCategory = legacyCategory ?? {
    id: categoryKey,
    name: categoryMeta.name,
    slug: slug!,
    tagline: categoryMeta.tagline,
    description: categoryMeta.description,
    icon: categoryMeta.icon,
    color: categoryMeta.color,
    subEvents: events.map((e) => ({
      id: e.id,
      name: e.name,
      tagline: e.tagline,
      description: e.description ?? e.tagline,
      type: e.participationType.toLowerCase() as "individual" | "team" | "duo",
      teamSize:
        e.minTeamSize && e.maxTeamSize ? `${e.minTeamSize}-${e.maxTeamSize} members` : undefined,
      registrationOpen: e.registrationOpen,
      image: e.imageUrl ?? undefined,
      prizePool: e.prizePool ?? undefined,
    })),
  };

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
