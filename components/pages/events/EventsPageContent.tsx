"use client";

import { memo, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { EVENT_CATEGORIES } from "@/components/pages/events/config/events.config";
import { COLORS, JAZZ_COLORS } from "@/components/pages/home/constants/palette";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";

// ═══════════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════════
type LocationCategory = "academic" | "ground" | "facility" | "gate" | "hostel";

interface CampusLocation {
  id: string;
  name: string;
  shortName: string;
  description: string;
  topPercent: number;
  leftPercent: number;
  category: LocationCategory;
  color: string;
}

const CATEGORY_META: Record<LocationCategory, { label: string; color: string; icon: string }> = {
  academic:  { label: "Academic",    color: "#60a5fa", icon: "🎓" },
  ground:    { label: "Grounds",     color: "#4ade80", icon: "🏟️" },
  facility:  { label: "Facilities",  color: "#f59e0b", icon: "🏛️" },
  gate:      { label: "Gates",       color: "#f87171", icon: "🚪" },
  hostel:    { label: "Hostels",     color: "#c084fc", icon: "🏠" },
};

const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: "loc-btn-ee-main-building",
    name: "Electrical Engineering (Main Building)",
    shortName: "EE Main",
    description: "The iconic main building and administrative hub of IIT BHU. A landmark of the campus.",
    topPercent: 36.2, leftPercent: 34.5,
    category: "academic", color: "#60a5fa",
  },
  {
    id: "loc-btn-sb",
    name: "Swatantrata Bhavan (SB)",
    shortName: "SB",
    description: "Swatantrata Bhavan – a central academic and cultural facility at IIT BHU.",
    topPercent: 18.5, leftPercent: 36.8,
    category: "facility", color: "#f59e0b",
  },
  {
    id: "loc-btn-lt1",
    name: "Lecture Theatre 1",
    shortName: "LT-1",
    description: "Lecture Theatre 1 — a major academic venue used for large seminars and lectures.",
    topPercent: 39.0, leftPercent: 50.2,
    category: "academic", color: "#60a5fa",
  },
  {
    id: "loc-btn-lt2",
    name: "Lecture Theatre 2",
    shortName: "LT-2",
    description: "Lecture Theatre 2 — central academic hall for events and presentations.",
    topPercent: 32.8, leftPercent: 25.5,
    category: "academic", color: "#60a5fa",
  },
  {
    id: "loc-btn-lt3",
    name: "Lecture Theatre 3",
    shortName: "LT-3",
    description: "Lecture Theatre 3 — located in the academic block, used for competitions and seminars.",
    topPercent: 20.0, leftPercent: 70.5,
    category: "academic", color: "#60a5fa",
  },
  {
    id: "loc-btn-lt4",
    name: "Lecture Theatre 4",
    shortName: "LT-4",
    description: "Lecture Theatre 4 — northern academic venue near the hostel zone.",
    topPercent: 12.0, leftPercent: 60.8,
    category: "academic", color: "#60a5fa",
  },
  {
    id: "loc-btn-adv-ground",
    name: "ADV Ground",
    shortName: "ADV Ground",
    description: "The ADV Athletics Ground — the primary sports arena for outdoor competitions and events.",
    topPercent: 43.0, leftPercent: 72.8,
    category: "ground", color: "#4ade80",
  },
  {
    id: "loc-btn-gymkhana-ground",
    name: "Gymkhana Ground",
    shortName: "Gymkhana",
    description: "Gymkhana Ground — a large open ground used for major cultural and sports events.",
    topPercent: 54.8, leftPercent: 60.8,
    category: "ground", color: "#4ade80",
  },
  {
    id: "loc-btn-rajputana-ground",
    name: "Rajputana Ground",
    shortName: "Rajputana",
    description: "Rajputana Ground — an athletics track and field area for outdoor activities.",
    topPercent: 60.2, leftPercent: 44.5,
    category: "ground", color: "#4ade80",
  },
  {
    id: "loc-btn-sac",
    name: "Student Activity Centre (SAC)",
    shortName: "SAC",
    description: "The Student Activity Centre — the hub for student clubs, cultural events, and activities.",
    topPercent: 56.5, leftPercent: 31.0,
    category: "facility", color: "#f59e0b",
  },
  {
    id: "loc-btn-girls-hostels",
    name: "Girls Hostels",
    shortName: "Girls Hostels",
    description: "Girls' residential zone — accommodation for female students of IIT BHU.",
    topPercent: 74.0, leftPercent: 45.0,
    category: "hostel", color: "#c084fc",
  },
  {
    id: "loc-btn-pc-ray-satish-dhawan",
    name: "PC Ray & Satish Dhawan Hostels",
    shortName: "PC Ray / SD Hostel",
    description: "Boys' hostels — Prafulla Chandra Ray and Satish Dhawan residential halls.",
    topPercent: 78.2, leftPercent: 17.5,
    category: "hostel", color: "#c084fc",
  },
  {
    id: "loc-btn-entry-iit-bhu",
    name: "Entry Gate to IIT (BHU)",
    shortName: "IIT Entry",
    description: "Main entry gate to the IIT BHU campus from the BHU side.",
    topPercent: 54.0, leftPercent: 21.0,
    category: "gate", color: "#f87171",
  },
  {
    id: "loc-btn-rajputana-crossing",
    name: "Rajputana Crossing",
    shortName: "Rajputana X",
    description: "A key road intersection near the Rajputana zone of the campus.",
    topPercent: 69.2, leftPercent: 29.8,
    category: "gate", color: "#f87171",
  },
  {
    id: "loc-btn-hyderabad-gate",
    name: "Hyderabad Gate",
    shortName: "Hyderabad Gate",
    description: "The southern exit/entry gate of the campus, leading toward Hyderabad Colony.",
    topPercent: 94.0, leftPercent: 43.5,
    category: "gate", color: "#f87171",
  },
  {
    id: "loc-btn-sergovardhanpur-gate",
    name: "Sergovardhanpur Gate",
    shortName: "Sergovardan Gate",
    description: "The northern campus gate connecting IIT BHU to Sergovardhanpur locality.",
    topPercent: 4.5, leftPercent: 52.8,
    category: "gate", color: "#f87171",
  },
  {
    id: "loc-btn-vishwanath-temple",
    name: "Vishwanath Temple",
    shortName: "Vishwanath Temple",
    description: "The iconic Vishwanath Temple — a spiritual landmark within the BHU campus.",
    topPercent: 54.5, leftPercent: 8.8,
    category: "facility", color: "#f59e0b",
  },
];

// ═══════════════════════════════════════════════════════════════════
// LOCATION PIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
const LocationPin = memo(function LocationPin({
  loc,
  isActive,
  onClick,
}: {
  loc: CampusLocation;
  isActive: boolean;
  onClick: (loc: CampusLocation) => void;
}) {
  return (
    <button
      id={loc.id}
      onClick={() => onClick(loc)}
      title={loc.name}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group focus:outline-none flex flex-col items-center"
      style={{ top: `${loc.topPercent}%`, left: `${loc.leftPercent}%` }}
      aria-label={loc.name}
    >
      {/* Outer pulse ring */}
      <span
        className="absolute rounded-full animate-ping"
        style={{
          background: loc.color,
          opacity: isActive ? 0.6 : 0.35,
          width: isActive ? 24 : 18,
          height: isActive ? 24 : 18,
          top: isActive ? -3 : 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      {/* Core dot */}
      <span
        className="relative flex-shrink-0 flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-125"
        style={{
          width: isActive ? 18 : 13,
          height: isActive ? 18 : 13,
          background: isActive
            ? `radial-gradient(circle, white 20%, ${loc.color} 70%)`
            : loc.color,
          boxShadow: `0 0 ${isActive ? 14 : 7}px ${loc.color}, 0 0 ${isActive ? 28 : 14}px ${loc.color}80`,
          borderColor: isActive ? "white" : "rgba(255,255,255,0.8)",
        }}
      />
      {/* Always-visible label below the dot */}
      <span
        className="pointer-events-none mt-0.5 whitespace-nowrap font-bold leading-tight text-center transition-all duration-200"
        style={{
          fontSize: "9px",
          color: isActive ? "white" : loc.color,
          textShadow: "0 0 8px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)",
          background: isActive ? `${loc.color}45` : "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          padding: "1px 5px",
          borderRadius: "4px",
          border: `1px solid ${isActive ? loc.color : loc.color + "55"}`,
          maxWidth: "72px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          boxShadow: isActive ? `0 0 8px ${loc.color}50` : "none",
        }}
      >
        {loc.shortName}
      </span>
    </button>
  );
});

// ═══════════════════════════════════════════════════════════════════
// INFO CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const InfoCard = memo(function InfoCard({
  loc,
  onClose,
}: {
  loc: CampusLocation;
  onClose: () => void;
}) {
  const meta = CATEGORY_META[loc.category];
  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "rgba(8,5,20,0.96)",
        border: `1px solid ${loc.color}50`,
        backdropFilter: "blur(16px)",
        boxShadow: `0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px ${loc.color}30, 0 0 30px ${loc.color}20`,
      }}
    >
      {/* Color accent top bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${loc.color}, transparent)` }} />
      <div className="p-4">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${loc.color}20`, color: loc.color, border: `1px solid ${loc.color}40` }}
          >
            {meta.icon} {meta.label}
          </span>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Location name */}
        <h3 className="font-black text-base text-white leading-snug mb-1">{loc.name}</h3>
        {/* Description */}
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          {loc.description}
        </p>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CAMPUS MAP SECTION
// ═══════════════════════════════════════════════════════════════════
const CampusMapSection = memo(function CampusMapSection() {
  const [activeLocation, setActiveLocation] = useState<CampusLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<LocationCategory | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handlePinClick = useCallback((loc: CampusLocation) => {
    setActiveLocation((prev) => (prev?.id === loc.id ? null : loc));
  }, []);

  const filteredLocations =
    activeFilter === "all"
      ? CAMPUS_LOCATIONS
      : CAMPUS_LOCATIONS.filter((l) => l.category === activeFilter);

  return (
    <section className="mb-16 sm:mb-24">
      {/* ── Section Header ── */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})` }} />
          <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: COLORS.BRIGHT_GOLD }}>Venue Guide</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)` }} />
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black italic mb-3"
          style={{
            fontFamily: "Georgia, serif",
            background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.CREAM} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          IIT BHU Campus Map
        </h2>
        <p className="text-sm sm:text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          Explore every venue at Kashi Yatra 2027. Click a pin on the map or a location in the list.
        </p>
      </div>

      {/* ── Category Filter Pills ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveFilter("all")}
          className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
          style={
            activeFilter === "all"
              ? { background: COLORS.BRIGHT_GOLD, color: "#0c0810" }
              : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }
          }
        >
          ✦ All ({CAMPUS_LOCATIONS.length})
        </button>
        {(Object.entries(CATEGORY_META) as [LocationCategory, typeof CATEGORY_META[LocationCategory]][]).map(([key, meta]) => {
          const count = CAMPUS_LOCATIONS.filter((l) => l.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={
                activeFilter === key
                  ? { background: meta.color, color: "#080510" }
                  : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: `1px solid ${meta.color}40` }
              }
            >
              {meta.icon} {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Main Layout: Sidebar + Map ── */}
      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto">
        {/* Left Sidebar - Location List */}
        <div
          className="lg:w-72 xl:w-80 flex-shrink-0 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,6,20,0.85)",
            border: "1px solid rgba(255,215,0,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "rgba(255,215,0,0.12)" }}
          >
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: COLORS.BRIGHT_GOLD }}>
              {filteredLocations.length} Location{filteredLocations.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div
            className="overflow-y-auto max-h-[420px] lg:max-h-[560px] divide-y divide-white/5 scroll-smooth overscroll-contain"
            style={{ scrollbarWidth: "thin", scrollbarColor: `${COLORS.BRIGHT_GOLD}40 transparent` }}
          >
            {filteredLocations.map((loc) => {
              const meta = CATEGORY_META[loc.category];
              const isActive = activeLocation?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => handlePinClick(loc)}
                  onMouseEnter={() => setHoveredId(loc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: isActive ? `${loc.color}18` : hoveredId === loc.id ? "rgba(255,255,255,0.04)" : "transparent",
                    borderLeft: isActive ? `3px solid ${loc.color}` : "3px solid transparent",
                  }}
                >
                  {/* Dot */}
                  <span
                    className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    style={{
                      background: loc.color,
                      boxShadow: isActive ? `0 0 8px ${loc.color}` : "none",
                    }}
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold truncate" style={{ color: isActive ? loc.color : "rgba(255,255,255,0.85)" }}>
                      {loc.shortName}
                    </span>
                    <span className="block text-[10px]" style={{ color: meta.color + "aa" }}>
                      {meta.icon} {meta.label}
                    </span>
                  </span>
                  {isActive && (
                    <span className="text-xs" style={{ color: loc.color }}>▶</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Map */}
        <div className="flex-1 min-w-0">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8,5,18,0.9)",
              border: "1px solid rgba(255,215,0,0.2)",
              boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.3)",
            }}
          >
            {/* Decorative corner accents */}
            {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 z-10 ${cls}`} style={{ borderColor: `${COLORS.BRIGHT_GOLD}50` }} />
            ))}

            {/* Map canvas */}
            <div className="relative w-full" style={{ aspectRatio: "1080 / 1224" }}>
              {/* Vignette overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none rounded-xl"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(5,3,15,0.6) 100%)",
                }}
              />

              <Image
                src="/iit-bhu-map.jpeg"
                alt="IIT BHU Campus Map"
                fill
                className="object-fill rounded-xl"
                priority
              />

              {/* Pins */}
              {filteredLocations.map((loc) => (
                <LocationPin
                  key={loc.id}
                  loc={loc}
                  isActive={activeLocation?.id === loc.id}
                  onClick={handlePinClick}
                />
              ))}

              {/* Info Card */}
              {activeLocation && (
                <InfoCard loc={activeLocation} onClose={() => setActiveLocation(null)} />
              )}
            </div>

            {/* Legend Bar */}
            <div
              className="px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t"
              style={{ borderColor: "rgba(255,215,0,0.1)", background: "rgba(5,3,12,0.8)" }}
            >
              {(Object.entries(CATEGORY_META) as [LocationCategory, typeof CATEGORY_META[LocationCategory]][]).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{meta.label}</span>
                </div>
              ))}
              <div className="ml-auto text-[11px] italic" style={{ color: "rgba(255,255,255,0.3)" }}>
                Click any pin to explore
              </div>
            </div>
          </div>

          {/* Google Maps CTA */}
          <div className="mt-3 flex justify-end">
            <a
              href="https://maps.google.com/?q=IIT+BHU+Varanasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

// ═══════════════════════════════════════════════════════════════════
// CATEGORY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
const CategoryCard = memo(function CategoryCard({
  category,
  index,
}: {
  category: (typeof EVENT_CATEGORIES)[0];
  index: number;
}) {
  return (
    <Link
      href={`/events/${category.slug}`}
      className="group relative block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden transition-all duration-500 sm:group-hover:scale-[1.03] sm:group-hover:-translate-y-2"
        style={{
          background: `linear-gradient(180deg, ${category.color}15 0%, ${JAZZ_COLORS.BG_DEEP} 30%, ${JAZZ_COLORS.BG_ROYAL} 70%, ${category.color}20 100%)`,
          border: `2px solid ${category.color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${category.color}20`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }} />
        <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${category.color}20 0%, transparent 70%)` }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[150px]">{category.icon}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
          <h3 className="text-2xl sm:text-3xl font-black italic mb-2" style={{ fontFamily: "Georgia, serif", color: COLORS.CREAM, textShadow: `0 2px 10px rgba(0,0,0,0.5), 0 0 30px ${category.color}50` }}>
            {category.name}
          </h3>
          <p className="text-sm sm:text-base opacity-80 line-clamp-2" style={{ color: category.color }}>{category.tagline}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit" style={{ background: `${category.color}20`, border: `1px solid ${category.color}40`, color: category.color }}>
            <span>{category.subEvents.length} Events</span>
            <svg className="w-3 h-3 transition-transform sm:group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        {[["top-3 left-3 border-l-2 border-t-2"], ["top-3 right-3 border-r-2 border-t-2"], ["bottom-3 left-3 border-l-2 border-b-2"], ["bottom-3 right-3 border-r-2 border-b-2"]].map(([cls], i) => (
          <div key={i} className={`absolute w-6 h-6 ${cls}`} style={{ borderColor: `${category.color}50` }} />
        ))}
      </div>
    </Link>
  );
});

// ═══════════════════════════════════════════════════════════════════
// PAGE TITLE
// ═══════════════════════════════════════════════════════════════════
const PageTitle = memo(function PageTitle() {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})` }} />
        <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: COLORS.BRIGHT_GOLD }}>Kashi Yatra 2027</span>
        <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)` }} />
      </div>
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-black italic mb-4"
        style={{
          fontFamily: "Georgia, serif",
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 50%, ${COLORS.CREAM} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Competitions
      </h1>
      <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
        Nine spectacular categories. Countless opportunities to shine.
        <br className="hidden sm:block" />
        Find your stage and let your talent speak.
      </p>
      <div className="mt-8">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${JAZZ_COLORS.HOT_PINK}80 0%, ${JAZZ_COLORS.ROYAL_PURPLE}80 100%)`,
            color: COLORS.CREAM,
            border: `1px solid ${JAZZ_COLORS.HOT_PINK}50`,
            boxShadow: `0 4px 20px ${JAZZ_COLORS.HOT_PINK}30`,
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Rulebook
        </a>
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════
export function EventsPageContent() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-6"
        style={{
          background: `linear-gradient(180deg, ${JAZZ_COLORS.BG_DEEP} 0%, ${JAZZ_COLORS.BG_ROYAL} 20%, ${JAZZ_COLORS.BG_WINE} 50%, ${JAZZ_COLORS.BG_ROYAL} 80%, ${JAZZ_COLORS.BG_DEEP} 100%)`,
        }}
      >
        {/* Background ambient glows */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${JAZZ_COLORS.HOT_PINK}08 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, ${JAZZ_COLORS.ROYAL_PURPLE}08 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255,215,0,0.03) 0%, transparent 60%)
            `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <PageTitle />

          {/* Campus Map — shown first */}
          <CampusMapSection />

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD}40)` }} />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold px-4" style={{ color: COLORS.BRIGHT_GOLD }}>Explore Events</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}40, transparent)` }} />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {EVENT_CATEGORIES.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          {/* Bottom hint */}
          <div className="mt-16 sm:mt-20 text-center">
            <div
              className="inline-block px-6 py-3 rounded-full text-sm"
              style={{ background: `${COLORS.BRIGHT_GOLD}10`, border: `1px solid ${COLORS.BRIGHT_GOLD}30`, color: COLORS.BRIGHT_GOLD }}
            >
              Click on any category to explore events
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
