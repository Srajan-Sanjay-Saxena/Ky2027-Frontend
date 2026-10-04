"use client";

import { memo } from "react";
import Link from "next/link";
import {
  EventCategory,
  SubEvent,
} from "@/components/pages/events/config/events.config";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";

// ═══════════════════════════════════════════════════════════════════
// SUB-EVENT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const SubEventCard = memo(function SubEventCard({
  event,
  categoryColor,
  index,
}: {
  event: SubEvent;
  categoryColor: string;
  index: number;
}) {
  const typeColors: Record<string, { bg: string; text: string }> = {
    individual: { bg: `${JAZZ_COLORS.HOT_PINK}20`, text: JAZZ_COLORS.HOT_PINK },
    duo: {
      bg: `${JAZZ_COLORS.ELECTRIC_BLUE}20`,
      text: JAZZ_COLORS.ELECTRIC_BLUE,
    },
    team: { bg: `${JAZZ_COLORS.ROYAL_PURPLE}20`, text: COLORS.LAVENDER },
  };

  const typeConfig = typeColors[event.type] || typeColors.individual;

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card Container */}
      <div
        className="relative h-full rounded-xl overflow-hidden transition-all duration-300 sm:hover:scale-[1.02] sm:hover:-translate-y-1"
        style={{
          background: `linear-gradient(160deg, 
            ${categoryColor}08 0%, 
            ${JAZZ_COLORS.BG_DEEP} 30%,
            ${JAZZ_COLORS.BG_ROYAL}90 100%
          )`,
          border: `1px solid ${categoryColor}25`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${categoryColor}80, transparent)`,
          }}
        />

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Header with type badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className="text-lg sm:text-xl font-bold"
              style={{
                color: COLORS.CREAM,
                fontFamily: "Georgia, serif",
              }}
            >
              {event.name}
            </h3>

            {/* Type badge */}
            <span
              className="flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: typeConfig.bg,
                color: typeConfig.text,
                border: `1px solid ${typeConfig.text}30`,
              }}
            >
              {event.type}
            </span>
          </div>

          {/* Tagline */}
          <p
            className="text-sm font-medium mb-3"
            style={{ color: categoryColor }}
          >
            {event.tagline}
          </p>

          {/* Description */}
          <p
            className="text-sm leading-relaxed line-clamp-3 sm:line-clamp-4"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {event.description}
          </p>

          {/* Team size if applicable */}
          {event.teamSize && (
            <div
              className="mt-4 inline-flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Team Size: {event.teamSize}</span>
            </div>
          )}

          {/* Register button */}
          <div className="mt-6">
            <button
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 sm:hover:scale-[1.02]"
              style={{
                background: event.registrationOpen
                  ? `linear-gradient(135deg, ${categoryColor}90 0%, ${categoryColor}70 100%)`
                  : "rgba(255,255,255,0.1)",
                color: event.registrationOpen
                  ? COLORS.CREAM
                  : "rgba(255,255,255,0.4)",
                border: `1px solid ${event.registrationOpen ? categoryColor : "rgba(255,255,255,0.2)"}`,
                cursor: event.registrationOpen ? "pointer" : "not-allowed",
              }}
              disabled={!event.registrationOpen}
            >
              {event.registrationOpen ? "Register Now" : "Coming Soon"}
            </button>
          </div>
        </div>

        {/* Hover glow - desktop only */}
        <div
          className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${categoryColor}10 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CATEGORY HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════
const CategoryHeader = memo(function CategoryHeader({
  category,
}: {
  category: EventCategory;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Back button */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All Categories
      </Link>

      {/* Category icon and title */}
      <div className="flex items-center gap-4 sm:gap-6 mb-6">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl"
          style={{
            background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
            border: `2px solid ${category.color}40`,
          }}
        >
          {category.icon}
        </div>

        <div>
          <h1
            className="text-3xl sm:text-4xl font-black italic"
            style={{
              fontFamily: "Georgia, serif",
              color: COLORS.CREAM,
              textShadow: `0 2px 20px ${category.color}40`,
            }}
          >
            {category.name}
          </h1>
          <p
            className="text-sm sm:text-base mt-1"
            style={{ color: category.color }}
          >
            {category.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className="max-w-3xl text-base sm:text-lg leading-relaxed"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {category.description}
      </p>

      {/* Stats bar */}
      <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
        <div
          className="px-4 py-2 rounded-lg"
          style={{
            background: `${category.color}15`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: category.color }}
          >
            {category.subEvents.length}
          </span>
          <span
            className="ml-2 text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Events
          </span>
        </div>

        <div
          className="px-4 py-2 rounded-lg"
          style={{
            background: `${JAZZ_COLORS.ELECTRIC_BLUE}15`,
            border: `1px solid ${JAZZ_COLORS.ELECTRIC_BLUE}30`,
          }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: JAZZ_COLORS.ELECTRIC_BLUE }}
          >
            {category.subEvents.filter((e) => e.registrationOpen).length}
          </span>
          <span
            className="ml-2 text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Open for Registration
          </span>
        </div>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════
export function CategoryPageContent({ category }: { category: EventCategory }) {
  return (
    <>
      {/* Fixed navbar - always visible */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6"
        style={{
          background: `linear-gradient(180deg, 
            ${JAZZ_COLORS.BG_DEEP} 0%, 
            ${category.color}08 20%,
            ${JAZZ_COLORS.BG_WINE} 50%,
            ${category.color}05 80%,
            ${JAZZ_COLORS.BG_DEEP} 100%
          )`,
        }}
      >
        {/* Background decorative elements */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 30%, ${category.color} 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${JAZZ_COLORS.ROYAL_PURPLE} 0%, transparent 50%)
          `,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <CategoryHeader category={category} />

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {category.subEvents.map((event, index) => (
              <SubEventCard
                key={event.id}
                event={event}
                categoryColor={category.color}
                index={index}
              />
            ))}
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 sm:mt-20 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${JAZZ_COLORS.HOT_PINK}80 0%, ${JAZZ_COLORS.ROYAL_PURPLE}80 100%)`,
                color: COLORS.CREAM,
                border: `1px solid ${JAZZ_COLORS.HOT_PINK}50`,
                boxShadow: `0 4px 20px ${JAZZ_COLORS.HOT_PINK}30`,
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Explore All Categories
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
