"use client";

import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GRADIENT_STAGE, CONCERT_COLORS, ARTISTS } from "./constants";
import {
  HeadlinerCard,
  FeaturingCard,
  SectionTitle,
  GlowingMoon,
  DancingGirlFestiveVibes,
  TopBorder,
  BottomBorder,
  GridOverlay,
} from "./common";
import { MotionZone } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// FLOATING ELEMENTS - Desktop only
// ═══════════════════════════════════════════════════════════════════
const FloatingElements = memo(function FloatingElements() {
  return (
    <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Music Notes */}
      <div 
        className="absolute top-[12%] left-[6%] text-7xl opacity-40"
        style={{ 
          animation: "floatNote1 8s ease-in-out infinite",
          color: CONCERT_COLORS.NEON_GOLD,
          filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_GOLD})`,
        }}
      >
        ♪
      </div>
      <div 
        className="absolute top-[20%] right-[7%] text-6xl opacity-35"
        style={{ 
          animation: "floatNote2 10s ease-in-out infinite",
          color: CONCERT_COLORS.NEON_PINK,
          filter: `drop-shadow(0 0 25px ${CONCERT_COLORS.NEON_PINK})`,
        }}
      >
        ♫
      </div>
      <div 
        className="absolute top-[55%] left-[4%] text-5xl opacity-35"
        style={{ 
          animation: "floatNote3 9s ease-in-out infinite",
          color: CONCERT_COLORS.NEON_PURPLE,
          filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_PURPLE})`,
        }}
      >
        ♬
      </div>
      <div 
        className="absolute top-[40%] right-[5%] text-6xl opacity-40"
        style={{ 
          animation: "floatNote1 11s ease-in-out infinite 1s",
          color: CONCERT_COLORS.NEON_GOLD,
          filter: `drop-shadow(0 0 25px ${CONCERT_COLORS.NEON_GOLD})`,
        }}
      >
        ♪
      </div>
      <div 
        className="absolute top-[70%] right-[8%] text-5xl opacity-30"
        style={{ 
          animation: "floatNote2 12s ease-in-out infinite 2s",
          color: CONCERT_COLORS.NEON_CYAN,
          filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_CYAN})`,
        }}
      >
        ♫
      </div>

      {/* Floating Stars */}
      <div 
        className="absolute top-[18%] left-[15%] text-4xl opacity-50"
        style={{ 
          animation: "floatStar 6s ease-in-out infinite",
          color: "#fff",
          filter: "drop-shadow(0 0 15px #fff)",
        }}
      >
        ✦
      </div>
      <div 
        className="absolute top-[32%] right-[14%] text-3xl opacity-45"
        style={{ 
          animation: "floatStar 7s ease-in-out infinite 0.5s",
          color: CONCERT_COLORS.NEON_GOLD,
          filter: `drop-shadow(0 0 12px ${CONCERT_COLORS.NEON_GOLD})`,
        }}
      >
        ✧
      </div>
      <div 
        className="absolute top-[65%] left-[12%] text-3xl opacity-40"
        style={{ 
          animation: "floatStar 8s ease-in-out infinite 1s",
          color: CONCERT_COLORS.NEON_PINK,
          filter: `drop-shadow(0 0 12px ${CONCERT_COLORS.NEON_PINK})`,
        }}
      >
        ✦
      </div>

      {/* Floating Glowing Orbs */}
      <div 
        className="absolute top-[25%] left-[8%] w-6 h-6 rounded-full opacity-60"
        style={{ 
          animation: "floatOrb 12s ease-in-out infinite",
          background: `radial-gradient(circle, ${CONCERT_COLORS.NEON_PINK}, transparent)`,
          boxShadow: `0 0 40px ${CONCERT_COLORS.NEON_PINK}, 0 0 60px ${CONCERT_COLORS.NEON_PINK}50`,
        }}
      />
      <div 
        className="absolute top-[48%] right-[6%] w-8 h-8 rounded-full opacity-50"
        style={{ 
          animation: "floatOrb 14s ease-in-out infinite 2s",
          background: `radial-gradient(circle, ${CONCERT_COLORS.NEON_PURPLE}, transparent)`,
          boxShadow: `0 0 50px ${CONCERT_COLORS.NEON_PURPLE}, 0 0 80px ${CONCERT_COLORS.NEON_PURPLE}50`,
        }}
      />
      <div 
        className="absolute top-[72%] left-[7%] w-5 h-5 rounded-full opacity-55"
        style={{ 
          animation: "floatOrb 10s ease-in-out infinite 1s",
          background: `radial-gradient(circle, ${CONCERT_COLORS.NEON_GOLD}, transparent)`,
          boxShadow: `0 0 35px ${CONCERT_COLORS.NEON_GOLD}, 0 0 50px ${CONCERT_COLORS.NEON_GOLD}50`,
        }}
      />
      <div 
        className="absolute top-[35%] right-[12%] w-4 h-4 rounded-full opacity-45"
        style={{ 
          animation: "floatOrb 11s ease-in-out infinite 3s",
          background: `radial-gradient(circle, ${CONCERT_COLORS.NEON_CYAN}, transparent)`,
          boxShadow: `0 0 30px ${CONCERT_COLORS.NEON_CYAN}, 0 0 45px ${CONCERT_COLORS.NEON_CYAN}50`,
        }}
      />

      {/* Floating Vinyl/Disc */}
      <div 
        className="absolute top-[30%] left-[3%] w-16 h-16 rounded-full opacity-25"
        style={{ 
          animation: "spin 20s linear infinite",
          background: `conic-gradient(from 0deg, ${CONCERT_COLORS.NEON_GOLD}40, transparent, ${CONCERT_COLORS.NEON_PINK}40, transparent, ${CONCERT_COLORS.NEON_GOLD}40)`,
          border: `2px solid ${CONCERT_COLORS.NEON_GOLD}50`,
          boxShadow: `0 0 30px ${CONCERT_COLORS.NEON_GOLD}30`,
        }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{ background: CONCERT_COLORS.NEON_GOLD, boxShadow: `0 0 10px ${CONCERT_COLORS.NEON_GOLD}` }}
        />
      </div>

      {/* Equalizer Bars */}
      <div className="absolute top-[60%] right-[3%] flex items-end gap-1 opacity-30">
        {[20, 32, 24, 36, 28, 40, 22].map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-full"
            style={{
              height: `${h}px`,
              background: `linear-gradient(to top, ${CONCERT_COLORS.NEON_PINK}, ${CONCERT_COLORS.NEON_GOLD})`,
              animation: `equalizerBounce 0.${4 + i}s ease-in-out infinite alternate`,
              boxShadow: `0 0 10px ${CONCERT_COLORS.NEON_PINK}`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════
// MAIN PRONITES SECTION
// Clean composition of all sub-components
// ═══════════════════════════════════════════════════════════════════
export const ProNitesSection = memo(function ProNitesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const headlinersRef = useRef<HTMLDivElement>(null);
  const featuringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // GSAP ScrollTrigger animations - Desktop only
  useEffect(() => {
    if (prefersReducedMotion) return;
    // Skip scroll animations on mobile for performance
    if (typeof window !== "undefined" && window.innerWidth < 640) return;

    const ctx = gsap.context(() => {
      // Title fade in and slide up
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // Headliner & Featuring cards: no scroll animation (render statically on desktop)
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const headliners = ARTISTS.filter((a) => a.isHeadliner);
  const previousLineups = ARTISTS.filter((a) => !a.isHeadliner);

  return (
    <MotionZone>
      <section
        ref={sectionRef}
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: GRADIENT_STAGE }}
      >
        {/* ═══ Background Elements ═══ */}
        <GlowingMoon />
        <DancingGirlFestiveVibes />
        <GridOverlay />
        <FloatingElements />
        <TopBorder />

        {/* ═══ Main Content ═══ */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div ref={titleRef}>
            <SectionTitle />
          </div>

          {/* Headliners */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold"
                style={{
                  color: CONCERT_COLORS.NEON_GOLD,
                  textShadow: `0 0 15px ${CONCERT_COLORS.NEON_GOLD}80`,
                }}
              >
                ★ Headliners ★
              </span>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>

            <div
              ref={headlinersRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto"
            >
              {headliners.map((artist, i) => (
                <HeadlinerCard key={artist.id} artist={artist} index={i} />
              ))}
            </div>
          </div>

          {/* Previous Lineups */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/30" />
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.15em] font-bold"
                style={{ 
                  color: CONCERT_COLORS.NEON_GOLD,
                  textShadow: `0 0 10px ${CONCERT_COLORS.NEON_GOLD}60`,
                }}
              >
                ✦ Previous Lineups ✦
              </span>
              <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/30" />
            </div>

            <div
              ref={featuringRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto"
            >
              {previousLineups.map((artist, i) => (
                <FeaturingCard key={artist.id} artist={artist} index={i} />
              ))}
            </div>
          </div>
        </div>

        <BottomBorder />
      </section>
    </MotionZone>
  );
});
