"use client";

// ═══════════════════════════════════════════════════════════════════
// DECORATIVE ELEMENTS
// Ornate borders, corners, and decorative flourishes
// ═══════════════════════════════════════════════════════════════════

export function DecorativeElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Top edge ornate pattern */}
      <div
        className="absolute top-0 right-0 left-0 h-32 opacity-20"
        style={{
          background: `linear-gradient(180deg, 
            rgba(212, 168, 83, 0.3) 0%, 
            rgba(212, 168, 83, 0.1) 30%,
            transparent 100%
          )`,
          maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
        }}
      />

      {/* Corner accents - decorative flourishes */}
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" mirror />
      <CornerFlourish position="bottom-left" flipY />
      <CornerFlourish position="bottom-right" mirror flipY />

      {/* Bottom decorative line (desktop only) */}
      <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4A853]/30" />
        <div className="h-2 w-2 rotate-45 border border-[#D4A853]/30" />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4A853]/30" />
      </div>
    </div>
  );
}

interface CornerFlourishProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  mirror?: boolean;
  flipY?: boolean;
}

function CornerFlourish({ position, mirror, flipY }: CornerFlourishProps) {
  const positionClasses = {
    "top-left": "top-20 left-4 lg:top-24 lg:left-8",
    "top-right": "top-20 right-4 lg:top-24 lg:right-8",
    "bottom-left": "bottom-4 left-4 lg:bottom-8 lg:left-8",
    "bottom-right": "bottom-4 right-4 lg:bottom-8 lg:right-8",
  };

  const scaleClass = `${mirror ? "-scale-x-100" : ""} ${flipY ? "-scale-y-100" : ""}`;

  return (
    <svg
      className={`absolute h-24 w-24 text-[#D4A853]/10 lg:h-32 lg:w-32 ${positionClasses[position]} ${scaleClass}`}
      viewBox="0 0 100 100"
      fill="none"
    >
      <path d="M5 95 Q5 5 95 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M15 95 Q15 15 95 15" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="5" cy="95" r="3" fill="currentColor" />
      <circle cx="95" cy="5" r="3" fill="currentColor" />
      <path
        d="M30 95 C30 60 60 30 95 30"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="4 4"
      />
    </svg>
  );
}
