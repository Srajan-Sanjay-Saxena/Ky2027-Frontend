"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FEST_DAYS, SCHEDULED_EVENTS } from "../config/campusMap.config";
import type { ScheduledEvent } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// WHAT'S ON
// Auto-scrolling list of every scheduled event. Each card opens the
// venue the event is held at.
// On hover: pauses auto-scroll and enables manual wheel/touch scrolling.
// ═══════════════════════════════════════════════════════════════════

// Interleave days so the loop shows a mix rather than all of Day 1 first
const FEED: ScheduledEvent[] = [...SCHEDULED_EVENTS].sort(
  (a, b) => a.category.name.localeCompare(b.category.name) || a.day - b.day
);

export function EventCard({ item, tabIndex }: { item: ScheduledEvent; tabIndex?: number }) {
  const { event, category, venue, day } = item;
  return (
    <Link
      href={`/schedule/${venue.slug}`}
      tabIndex={tabIndex}
      className="group block shrink-0 rounded-sm border border-white/[0.07] bg-[#10132a]/80 px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#161a36]"
      style={{ borderLeft: `2px solid ${category.color}` }}
    >
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] uppercase">
        <span className="flex items-center gap-1.5" style={{ color: category.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: category.color }} />
          {category.name}
        </span>
        <span className="text-white/60" title={FEST_DAYS[day]}>
          Day {day}
        </span>
      </div>
      <p className="mt-1.5 font-[family-name:var(--font-cormorant)] text-[19px] leading-tight font-semibold text-[#f3ead6] group-hover:text-white">
        {event.name}
      </p>
      <p className="mt-1 text-[11px] font-medium tracking-[0.06em] text-white/45">{venue.name}</p>
    </Link>
  );
}

export function WhatsOnSidebar({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <aside className={`flex min-h-0 flex-col ${className}`} aria-label="What's on">
      <h2 className="mb-3 flex items-center gap-2 px-1 text-[11px] font-bold tracking-[0.3em] text-[#f3ead6] uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f0b54a] shadow-[0_0_8px_#f0b54a]" />
        What&apos;s On
      </h2>

      <div
        ref={scrollRef}
        className={`whats-on-viewport min-h-0 flex-1 ${isHovered ? "is-hovered" : ""}`}
        data-lenis-prevent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="whats-on-track"
          style={{ "--duration": `${FEED.length * 3.5}s` } as React.CSSProperties}
        >
          {FEED.map((item) => (
            <EventCard key={item.event.id} item={item} />
          ))}
          {/* Duplicate for a seamless loop (hidden from assistive tech) - only when not hovered */}
          {!isHovered && (
            <div aria-hidden className="flex flex-col gap-2">
              {FEED.map((item) => (
                <EventCard key={`dup-${item.event.id}`} item={item} tabIndex={-1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
