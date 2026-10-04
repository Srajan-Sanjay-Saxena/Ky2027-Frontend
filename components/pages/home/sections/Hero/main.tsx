"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Moon } from "@/components/pages/home/sections/Hero/Sky/Moon";
import { Sun } from "@/components/pages/home/sections/Hero/Sky/Sun";
import { CinematicSky } from "@/components/pages/home/sections/Hero/Sky/CinematicSky";
import { FlyingBirds } from "@/components/pages/home/sections/Hero/Sky/Birds";
import { River } from "@/components/pages/home/sections/Hero/River";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks";
import { MotionZone } from "@/lib/motion";
import { Z_HERO } from "@/components/pages/home/constants";
import { IMAGES } from "@/lib/images";
import { Kandeels } from "@/components/pages/home/sections/Hero/desktop";
import { DriftingClouds } from "@/components/pages/home/sections/Hero/desktop";
import { EmberField } from "@/components/pages/home/sections/Hero/desktop";
import { MobileKite } from "@/components/pages/home/sections/Hero/mobile";
import { TitleBadge, Ghats } from "@/components/pages/home/sections/Hero/common";

// Register plugin at module level (runs once when file is imported)
gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);
  const celestialRef = useRef<HTMLDivElement>(null); // Moon or Sun
  const titleRef = useRef<HTMLHeadingElement>(null);
  const riverRef = useRef<HTMLDivElement>(null);
  const ghatsRef = useRef<HTMLDivElement>(null);
  const kitesRef = useRef<HTMLDivElement>(null);

  // Get current time-based sky configuration
  const { gradient, showMoon, showStars, starsOpacity, timeOfDay } =
    useTimeOfDay();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Entry animation: Celestial body (Moon or Sun)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(celestialRef.current, { scale: 0.5, opacity: 0 });
      gsap.to(celestialRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Title
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { y: -50, opacity: 0 });
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Temple & Ghats (related - both are buildings)
  useEffect(() => {
    /**
     * gsap.context() --> Creates a scope for animations that makes cleanup easy. All animations created inside it are tracked and can be reverted with a single call.
     * Why use it?
      React re-renders can create duplicate animations
      Without context, you'd manually track and kill each animation
      Essential for React's useEffect cleanup
     */

    const ctx = gsap.context(() => {
      gsap.set(templeRef.current, { y: 250, opacity: 0 });
      gsap.set(ghatsRef.current, { x: -250, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.8 });

      /*
        Symbol	Meaning
        "<"	Same start as previous
        ">"	Same end as previous
        "<0.2"	0.2s after previous starts
        ">-0.2"	0.2s before previous ends
        (none)	After previous ends	Sequential
        "-=0.3"	0.3s before previous ends	Overlap
        "+=0.3"	0.3s after previous ends	Gap
        2	At exactly 2 seconds	Absolute
        "<"	Same start as previous	Simultaneous
        "<0.2"	0.2s after previous starts	Slight delay from same start
       */

      tl.to(templeRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "none",
      }).to(
        ghatsRef.current,
        { x: -40, opacity: 1, duration: 0.5, ease: "none" },
        "<",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Entry animation: Kites - Desktop only, flies in after temple (not at night)
  useEffect(() => {
    // Skip on mobile or if it's night time
    if (typeof window === "undefined" || window.innerWidth < 640) return;
    if (timeOfDay === "night") return;
    if (!kitesRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(kitesRef.current, {
        x: -150,
        y: 50,
        opacity: 0,
        scale: 0.6,
        rotation: -30,
      });

      // Animate in after temple (delay matches temple timeline: 0.8 + 0.5 + 0.2 = 1.5s)
      gsap.to(kitesRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: -10,
        duration: 0.8,
        delay: 1.6, // After temple + ghats animation
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [timeOfDay]);

  // Continuous glow: Temple & Ghats (related visual effect)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(templeRef.current, {
        filter:
          "drop-shadow(0 0 40px rgba(255,215,0,0.5)) drop-shadow(0 0 70px rgba(255,140,0,0.3))",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ghatsRef.current, {
        filter:
          "drop-shadow(0 0 30px rgba(255,100,100,0.5)) drop-shadow(0 0 50px rgba(255,150,150,0.3))",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Parallax scroll: Celestial body & Temple (related scroll behavior) - Desktop only
  useEffect(() => {
    // Skip parallax on mobile for performance
    if (typeof window !== "undefined" && window.innerWidth < 640) return;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Use quickTo for performant scroll-driven animations
      // quickTo creates a reusable setter instead of spawning new tweens
      const celestialY = gsap.quickTo(celestialRef.current, "y", {
        duration: 0.1,
        ease: "none",
      });
      const templeY = gsap.quickTo(templeRef.current, "y", {
        duration: 0.1,
        ease: "none",
      });
      const ghatsX = gsap.quickTo(ghatsRef.current, "x", {
        duration: 0.1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          celestialY(p * -200);
          templeY(p * 60);
          ghatsX(p * -100 - 40); // -40 is the base x position from entry animation
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden max-w-[100vw]"
      style={{
        background: gradient,
        transition: "background 2s ease-in-out", // Smooth transition when time changes
      }}
    >
      {/* Cinematic Sky with stars, clouds, shooting stars - only visible at night/dusk */}
      {showStars && (
        <div
          style={{
            opacity: starsOpacity,
            transition: "opacity 2s ease-in-out",
          }}
        >
          <CinematicSky className="z-1" />
        </div>
      )}

      {/* Varanasi Background - Mobile optimized */}
      <div
        className="absolute bottom-[26%] sm:bottom-[27%] md:bottom-[26%] left-0 right-0 h-[25%] sm:h-[28%] md:h-[30%] z-6 pointer-events-none"
        style={{
          backgroundImage: `url('${IMAGES.hero.varanasiBack}')`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          filter: "brightness(0.3) saturate(0.5)",
          mixBlendMode: "luminosity",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* Enhanced Moon glow spreading into sky */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 12%, rgba(220,230,255,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 10%, rgba(255,255,250,0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Moon reflection on river hint */}
      <div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[20%] h-[25%] pointer-events-none z-14"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(255,255,250,0.06) 0%, transparent 60%)",
          animation: "moonReflectionShimmer 4s ease-in-out infinite",
        }}
      />

      {/* Faint drifting clouds - Desktop only */}
      <DriftingClouds />

      {/* Floating Kandeels (Sky Lanterns) - Desktop only */}
      <Kandeels />

      {/* Flying Birds - Mobile optimized */}
      {/* Wrapped in MotionZone to pause SMIL animations when off-screen */}
      <MotionZone className="absolute top-[6%] sm:top-[8%] left-0 w-full h-10 sm:h-14 md:h-18 z-30 overflow-hidden">
        <FlyingBirds className="w-full h-full" />
      </MotionZone>

      {/* Second flock - hidden on mobile for performance */}
      <MotionZone className="hidden sm:block absolute top-[12%] sm:top-[15%] left-0 w-full h-10 sm:h-12 md:h-16 z-30 overflow-hidden opacity-60">
        <FlyingBirds className="w-full h-full" />
      </MotionZone>

      {/* Celestial Body - Moon or Sun based on time of day */}
      {/* Dawn sun positioned on right side (rising from horizon), others centered */}
      <div
        ref={celestialRef}
        className={`absolute z-5 ${
          showMoon
            ? "top-[2%] sm:top-[3%] left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" // Moon - centered, high
            : timeOfDay === "dawn"
              ? "top-[12%] sm:top-[8%] right-[8%] sm:right-[12%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" // Dawn - right side, rising
              : timeOfDay === "morning"
                ? "top-[5%] sm:top-[6%] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24" // Morning - centered, rising
                : "top-[2%] sm:top-[3%] left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" // Afternoon/evening - centered, high
        }`}
        style={{ transition: "all 1s ease-in-out" }}
      >
        {showMoon ? (
          <Moon className="w-full h-full" isMobile={isMobile} />
        ) : (
          <Sun
            className="w-full h-full"
            isMobile={isMobile}
            variant={timeOfDay === "dawn" ? "dawn" : "day"}
          />
        )}
      </div>

      {/* Kites - Desktop only, top-left, hidden at night and dawn */}
      {timeOfDay !== "night" && timeOfDay !== "dawn" && (
        <div
          ref={kitesRef}
          className="hidden sm:block absolute top-[8%] left-[5%] w-[20vw] max-w-[280px] pointer-events-none z-50"
          style={{
            transform: "rotate(-10deg)",
            opacity: 0, // Start hidden, GSAP will animate it in
          }}
        >
          <Image
            src={IMAGES.hero.kites}
            alt="Flying Kites"
            width={350}
            height={300}
            className="w-full h-auto"
            style={{
              animation: "kitesFloat 4s ease-in-out infinite",
              filter: "drop-shadow(0 6px 15px rgba(0,0,0,0.25))",
            }}
          />
        </div>
      )}

      {/* Kites - Mobile only, floating animation, hidden at night */}
      {timeOfDay !== "night" && <MobileKite />}

      {/* Title - Mobile optimized */}
      <h1
        ref={titleRef}
        className="absolute top-[12%] sm:top-[14%] md:top-[18%] left-1/2 -translate-x-1/2 text-center z-[1000] w-full px-4"
      >
        <Image
          src={IMAGES.hero.logo}
          alt="काशी यात्रा"
          width={500}
          height={150}
          className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[450px] h-auto mx-auto"
          style={{
            filter:
              "drop-shadow(0 0 30px rgba(255,215,0,0.7)) drop-shadow(0 0 15px rgba(255,165,0,0.5))",
          }}
          priority
        />

        <TitleBadge />
      </h1>

      {/* GHATS - Day/Night variants with different positioning */}
      <Ghats ref={ghatsRef} timeOfDay={timeOfDay} />

      {/* TEMPLE PNG - Highest z-index, aligned with ghats */}
      <div
        ref={templeRef}
        className="absolute bottom-[31%] sm:bottom-[31%] md:bottom-[28%] right-[-9%] sm:right-[-6%] md:right-[-7%] w-[55%] sm:w-[62%] md:w-[56%] lg:w-[48%] pointer-events-none"
        style={{
          zIndex: Z_HERO.TEMPLE,
        }}
      >
        {/* Divine aura rings - Desktop only */}
        <div
          className="hidden sm:block absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)",
            animation: "divineAura 2s ease-in-out infinite",
          }}
        />
        <div
          className="hidden sm:block absolute top-[5%] left-1/2 -translate-x-1/2 w-[90%] h-[70%] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,140,0,0.1) 0%, transparent 60%)",
            animation: "divineAura 2.5s ease-in-out infinite reverse",
          }}
        />

        {/* Floating divine particles - Desktop only */}
        <div className="hidden sm:block">
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${15 + Math.floor(i / 4) * 25}%`,
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle, #FFD700 0%, transparent 70%)"
                    : "radial-gradient(circle, #FFA500 0%, transparent 70%)",
                animation: `floatParticle ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: "0 0 6px rgba(255,215,0,0.5)",
              }}
            />
          ))}
        </div>

        <Image
          src={IMAGES.hero.temple}
          alt="Kashi Vishwanath Temple"
          width={1000}
          height={1100}
          className="w-full h-auto sm:drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
          priority
        />
      </div>

      {/* RIVER - Contains water, lotus, diyas, boats, and stepping stones */}
      {/* RIVER - Contains water, lotus, diyas, boats, and stepping stones */}
      {/* Wrapped in MotionZone to pause SMIL animations when off-screen */}
      <MotionZone>
        <River ref={riverRef} />
      </MotionZone>

      {/* Floating embers - Desktop only */}
      <EmberField />
    </section>
  );
}
