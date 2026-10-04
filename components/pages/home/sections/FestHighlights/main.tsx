"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import {
  LotusSVG,
  Trishul,
  FestSparkles,
  TempleBell,
  BackgroundMandala,
} from "./common";
import { MerchIcon, FoodIcon, AccommodationIcon, CulturalAccessIcon } from "./icons";
import { IMAGES } from "@/lib/images";
import { MotionZone, useMotionZone } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks";
import { FestHighlightsMobile } from "./mobile";
import { FloatingParticles, GoddessDurga } from "./desktop";

const highlights = [
  {
    icon: MerchIcon,
    title: "Exclusive Merch",
    desc: "Premium hoodies & festival gear",
  },
  { 
    icon: FoodIcon, 
    title: "Delicious Food", 
    desc: "Authentic Banarasi cuisine & snacks" 
  },
  { 
    icon: AccommodationIcon, 
    title: "Accommodation", 
    desc: "Comfortable stay on IIT BHU campus" 
  },
  {
    icon: CulturalAccessIcon,
    title: "Cultural Access",
    desc: "Entry to all events & pro-shows",
  },
];

// Inner component that can access MotionZone context
function FestHighlightsContent() {
  const { isAnimating } = useMotionZone();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Skip animations on mobile for performance
    if (typeof window !== "undefined" && window.innerWidth < 640) return;

    const ctx = gsap.context(() => {
      // Temple reveal
      gsap.fromTo(
        templeRef.current,
        { x: -150, opacity: 0, scale: 0.85 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Decorative elements float
      const decorItems = decorRef.current?.querySelectorAll(".decor-item");
      decorItems?.forEach((item, i) => {
        gsap.to(item, {
          y: -15 + Math.random() * 30,
          rotation: -5 + Math.random() * 10,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // Temple glow pulse
      gsap.to(templeRef.current, {
        filter: "drop-shadow(0 0 60px rgba(176,63,35,0.7))",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Highlight cards stagger
      const cards = contentRef.current?.querySelectorAll(".highlight-card");
      gsap.fromTo(
        cards || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[auto] sm:min-h-screen py-6 sm:py-12 md:py-16 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          #1A1A2E 0%, 
          #2D1810 30%,
          #4A1A10 50%,
          #2D1810 70%,
          #1A1A2E 100%
        )`,
      }}
    >
      {/* Background Mandala - smaller on mobile */}
      <BackgroundMandala isAnimating={isAnimating} />

      {/* Floating Decorative Elements - hidden on mobile, reduced count */}
      <div
        ref={decorRef}
        className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden z-30"
      >
        {/* Single Trishul - top left */}
        <div className="decor-item hidden lg:block absolute top-[12%] left-[6%] w-10 h-20 text-[#FFD700] opacity-25">
          <Trishul className="w-full h-full" />
        </div>

        {/* Single Lotus - bottom right */}
        <div className="decor-item hidden lg:block absolute bottom-[10%] right-[10%] w-16 h-10 opacity-40">
          <LotusSVG className="w-full h-full" />
        </div>
      </div>

      {/* Floating particles - Desktop only */}
      <FloatingParticles />

      {/* TEMPLE BELLS - Desktop only */}
      <TempleBell
        className="hidden lg:flex absolute top-0 right-[12%] z-40"
        chainLength={180}
        size="md"
      />
      <TempleBell
        className="hidden xl:flex absolute top-0 left-[8%] z-40"
        chainLength={120}
        size="sm"
        delayed
      />

      {/* GODDESS DURGA - Divine presence - BEHIND content on desktop */}
      <GoddessDurga />

      {/* TEMPLE - Absolute positioned, large, on left */}
      <div
        ref={templeRef}
        className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-[55%] lg:w-[52%] xl:w-[50%] pointer-events-none hidden lg:block"
        style={{ zIndex: 1 }}
      >
        {/* Glow behind temple */}
        <div
          className="absolute inset-0 blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, #B03F23 0%, transparent 60%)",
          }}
        />

        {/* Energy rings behind temple - reduced to 2 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: 500 + i * 200,
                height: 500 + i * 200,
                left: -(250 + i * 100),
                top: -(250 + i * 100),
                borderColor: `rgba(255,107,0,${0.2 - i * 0.08})`,
                animation: `pulseRing ${3 + i * 1.5}s ease-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Temple Image - LARGE */}
        <Image
          src={IMAGES.highlights.durgaTemple}
          alt="Kashi Yatra Festival Venue"
          width={1400}
          height={850}
          className="w-full h-auto relative"
          style={{
            filter: "drop-shadow(0 0 40px rgba(176,63,35,0.5))",
          }}
          priority
        />
      </div>

      {/* Mobile Temple - Shows only on mobile/tablet */}
      <FestHighlightsMobile />

      {/* CONTENT - Centered on desktop with temple on left as backdrop */}
      <div className="relative z-10 min-h-[auto] sm:min-h-[45vh] lg:min-h-[85vh] flex items-start sm:items-center pt-0 sm:pt-10 lg:pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-center">
            <div
              ref={contentRef}
              className="w-full lg:w-[55%] xl:w-[50%] text-center lg:text-center"
            >
              {/* Royal top ornament */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <span
                  className="h-[1px] w-12 sm:w-20"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6))" }}
                />
                <span className="text-lg sm:text-xl" style={{ color: "#FFD700" }}>༺ ✦ ༻</span>
                <span
                  className="h-[1px] w-12 sm:w-20"
                  style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.6), transparent)" }}
                />
              </div>

              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
                style={{
                  textShadow: "0 0 30px rgba(255,215,0,0.5)",
                  fontFamily: "'Cinzel Decorative', serif",
                }}
              >
                <span style={{ color: "#FFD700" }}>The Grand </span>
                <span style={{ color: "#FF4500" }}>Cultural Fest</span>
              </h2>

              {/* Subtitle */}
              <p
                className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-5"
                style={{ color: "#FF6B00", fontWeight: 600 }}
              >
                ॥ What Awaits You ॥
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 opacity-90 max-w-xl mx-auto"
                style={{ color: "#FDF6E3", lineHeight: "1.8" }}
              >
                Experience four electrifying days of music, dance, and unforgettable moments. 
                From exclusive merchandise to authentic Banarasi flavors — we&apos;ve got everything 
                to make your Kashi Yatra truly memorable.
              </p>

              {/* Highlight Cards - Royal ornate design - First 2 on mobile, all 4 on desktop */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className={
                      "highlight-card relative p-3 sm:p-5 rounded-xl transition-all duration-300 sm:hover:scale-[1.02] cursor-pointer overflow-hidden group" +
                      (i >= 2 ? " hidden sm:block" : "")
                    }
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(139,21,56,0.35), rgba(92,10,31,0.4), rgba(45,24,16,0.35))",
                      border: "2px solid rgba(184,134,11,0.5)",
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,215,0,0.08)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {/* Shimmer effect on hover - desktop only */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.06) 50%, transparent 60%)",
                      }}
                    />

                    {/* Corner ornaments */}
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-[#FFD700] opacity-60" />
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-[#FFD700] opacity-60" />
                    <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-[#FFD700] opacity-60" />
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-[#FFD700] opacity-60" />

                    {/* Top decorative line */}
                    <div
                      className="absolute top-2 sm:top-3 left-6 sm:left-8 right-6 sm:right-8 h-[1px]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,215,0,0.25), transparent)",
                      }}
                    />

                    <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block relative z-10">
                      <item.icon size={40} className="mx-auto" />
                    </span>
                    <h4
                      className="font-bold text-[#FFD700] text-xs sm:text-base mb-1 sm:mb-1.5 relative z-10 uppercase tracking-wider"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-sm text-[#FDF6E3] opacity-80 relative z-10">
                      {item.desc}
                    </p>

                    {/* Bottom decorative line */}
                    <div
                      className="absolute bottom-2 sm:bottom-3 left-6 sm:left-8 right-6 sm:right-8 h-[1px]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B03F23, #FF4500, #B03F23, transparent)",
        }}
      />

      {/* FEST VIBES - Colorful sparkles and confetti */}
      <FestSparkles />
    </section>
  );
}

// Exported component wraps content with MotionZone
export function FestHighlightsSection() {
  return (
    <MotionZone threshold={0.05} rootMargin="100px">
      <FestHighlightsContent />
    </MotionZone>
  );
}
