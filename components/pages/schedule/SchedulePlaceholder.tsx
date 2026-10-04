"use client";

import { memo } from "react";
import { COLORS } from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// SCHEDULE PLACEHOLDER
// The full timetable is still being finalised. This shows the four
// festival days as elegant "coming soon" cards, matching the site's
// gold-on-royal glassmorphic card language.
// ═══════════════════════════════════════════════════════════════════

const DAYS = [
  { date: "14 Jan", day: "Day 1", theme: "Inauguration & Opening Acts" },
  { date: "15 Jan", day: "Day 2", theme: "Competitions & Workshops" },
  { date: "16 Jan", day: "Day 3", theme: "Cultural Nights" },
  { date: "17 Jan", day: "Day 4", theme: "Pro Nite & Grand Finale" },
] as const;

export const SchedulePlaceholder = memo(function SchedulePlaceholder() {
  return (
    <section className="relative px-4 sm:px-6 pb-24 sm:pb-32 max-w-5xl mx-auto">
      {/* Coming soon banner */}
      <div className="text-center mb-10 sm:mb-14">
        <span
          className="inline-block px-6 py-2 rounded-full text-xs sm:text-sm uppercase tracking-[0.3em] font-bold"
          style={{
            color: COLORS.BRIGHT_GOLD,
            border: "1px solid rgba(255,215,0,0.4)",
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(255,140,0,0.06) 100%)",
            boxShadow:
              "0 0 24px rgba(255,215,0,0.2), inset 0 0 16px rgba(255,215,0,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          Full Schedule Coming Soon
        </span>
      </div>

      {/* Day cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {DAYS.map((d) => (
          <article
            key={d.day}
            className="relative rounded-2xl p-6 sm:p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            style={{
              border: "1px solid rgba(255,215,0,0.25)",
              background:
                "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(157,23,77,0.10) 55%, rgba(255,215,0,0.05) 100%)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.35), inset 0 0 24px rgba(255,215,0,0.06)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.18) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            <p
              className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
              style={{ color: `${COLORS.BRIGHT_GOLD}CC` }}
            >
              {d.day} · {d.date}
            </p>

            <h2
              className="text-2xl sm:text-3xl font-black italic mb-4"
              style={{
                fontFamily: "Georgia, serif",
                background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.GOLD} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {d.theme}
            </h2>

            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}
            >
              Detailed timings and the full lineup for this day will be
              announced shortly. Stay tuned.
            </p>
          </article>
        ))}
      </div>

      {/* Footnote */}
      <p
        className="text-center text-sm mt-12 sm:mt-16"
        style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}
      >
        Schedule subject to change. Check back closer to the festival for the
        complete day-by-day programme.
      </p>
    </section>
  );
});
