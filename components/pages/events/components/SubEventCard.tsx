"use client";

import { memo } from "react";
import type { SubEvent } from "@/lib/api/helper/types";
import { COLORS, EVENT_TYPE_COLORS } from "../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// SUB-EVENT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

interface SubEventCardProps {
  event: SubEvent;
  categoryColor: string;
  index: number;
}

export const SubEventCard = memo(function SubEventCard({
  event,
  categoryColor,
  index,
}: SubEventCardProps) {
  const typeConfig =
    EVENT_TYPE_COLORS[event.type as keyof typeof EVENT_TYPE_COLORS] || EVENT_TYPE_COLORS.individual;

  return (
    <div className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Card Container */}
      <div
        className="relative h-full overflow-hidden rounded-xl transition-all duration-300 sm:hover:-translate-y-1 sm:hover:scale-[1.02]"
        style={{
          background: `linear-gradient(160deg, 
            ${categoryColor}08 0%, 
            #0a0612 30%,
            #1a0a1e90 100%
          )`,
          border: `1px solid ${categoryColor}25`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 right-0 left-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${categoryColor}80, transparent)`,
          }}
        />

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Header with type badge */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3
              className="text-lg font-bold sm:text-xl"
              style={{
                color: COLORS.CREAM,
                fontFamily: "Georgia, serif",
              }}
            >
              {event.name}
            </h3>

            {/* Type badge */}
            <span
              className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-semibold tracking-wider uppercase"
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
          <p className="mb-3 text-sm font-medium" style={{ color: categoryColor }}>
            {event.tagline}
          </p>

          {/* Description */}
          <p
            className="line-clamp-3 text-sm leading-relaxed sm:line-clamp-4"
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
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 sm:hover:scale-[1.02]"
              style={{
                background: event.registrationOpen
                  ? `linear-gradient(135deg, ${categoryColor}90 0%, ${categoryColor}70 100%)`
                  : "rgba(255,255,255,0.1)",
                color: event.registrationOpen ? COLORS.CREAM : "rgba(255,255,255,0.4)",
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
          className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block"
          style={{
            background: `radial-gradient(ellipse at center, ${categoryColor}10 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
});
