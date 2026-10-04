"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Road, LampPost, BHUGate } from "./common";
import { BanarasiVibesMobile } from "./mobile";
import { BanarasiVibesDesktop } from "./desktop";
import { IMAGES } from "@/lib/images";
import { MotionZone, useMotionZone } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks";

// Inner component that can access MotionZone context
function BanarasiVibesContent() {
  const { isAnimating } = useMotionZone();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const rickshawRef = useRef<HTMLDivElement>(null);
  const rickshawAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // BHU Gate rising from bottom
      gsap.fromTo(
        gateRef.current,
        { y: 600, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 20%",
            scrub: 1.5,
          },
        },
      );

      // Rickshaw continuous movement
      rickshawAnimRef.current = gsap.to(rickshawRef.current, {
        x: "120vw",
        duration: 14,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          gsap.set(rickshawRef.current, { x: 0 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Pause/resume rickshaw animation based on MotionZone context
  useEffect(() => {
    if (rickshawAnimRef.current) {
      if (isAnimating) {
        rickshawAnimRef.current.resume();
      } else {
        rickshawAnimRef.current.pause();
      }
    }
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      data-section="banarasi-vibes"
      className="relative min-h-screen overflow-hidden"
      style={{
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
        backgroundColor: "#1a1a1a", // Fallback to match road color
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${IMAGES.vibes.background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top Text Content - simple and clean */}
      <div className="absolute top-8 sm:top-5 md:top-6 left-0 right-0 z-[35] pointer-events-none">
        <div className="text-center px-4">
          {/* Main heading - no box, just text with shadow */}
          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: "#FFD700",
              textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7), 0 0 40px rgba(255,215,0,0.3)",
            }}
          >
            The Spirit of Banaras
          </h2>
          
          {/* Simple divider */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              className="h-[1px] w-10 sm:w-16"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6))" }}
            />
            <span className="text-xs sm:text-sm" style={{ color: "#FFD700" }}>✦</span>
            <span
              className="h-[1px] w-10 sm:w-16"
              style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.6), transparent)" }}
            />
          </div>

          {/* Key highlights - inline */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3">
            <span
              className="text-[10px] sm:text-xs tracking-wider"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Music
            </span>
            <span
              className="text-[10px] sm:text-xs tracking-wider"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Dance
            </span>
            <span
              className="text-[10px] sm:text-xs tracking-wider"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Art
            </span>
            <span
              className="text-[10px] sm:text-xs tracking-wider"
              style={{
                color: "#FFD700",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ✦ Culture
            </span>
          </div>

          {/* Subtitle - simple text */}
          <p
            className="text-xs sm:text-sm md:text-base"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FDF6E3",
              textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            Where ancient traditions dance with timeless grace
          </p>
        </div>
      </div>

      {/* Desktop-only elements */}
      <BanarasiVibesDesktop
        isAnimating={isAnimating}
        prefersReducedMotion={prefersReducedMotion}
        rickshawRef={rickshawRef}
      />

      {/* Mobile-only elements */}
      <BanarasiVibesMobile />

      {/* Common: BHU Gate with Mahamana */}
      <BHUGate ref={gateRef} />

      {/* Common: Road */}
      <Road />

      {/* Common: Lamp Post */}
      <MotionZone
        className="absolute left-[2%] sm:left-[20%] w-10 h-32 sm:w-30 sm:h-80"
        style={{ bottom: "45px", zIndex: 28 }}
      >
        <LampPost className="w-full h-full" />
      </MotionZone>

      {/* Bottom golden border */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none"
        style={{ height: "6px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #8B6914, #FFD700, #E8B820, #FFD700, #C8960C, #FFD700, #8B6914)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "1px", background: "rgba(255,255,255,0.3)" }}
        />
      </div>
    </section>
  );
}

// Exported component wraps content with MotionZone
export function BanarasiVibesSection() {
  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      <BanarasiVibesContent />
    </MotionZone>
  );
}
