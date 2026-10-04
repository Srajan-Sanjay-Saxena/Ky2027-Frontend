"use client";

import Image from "next/image";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/home/constants/palette";
import { MysticDivider } from "./MysticDivider";

// ═══════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════
export const HeroSection = memo(function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[150vw] sm:w-[100vw] max-w-[1200px] aspect-square opacity-15 sm:opacity-20">
          <Image
            src={IMAGES.about.mandalaOrnament}
            alt=""
            fill
            className="object-contain animate-spin"
            style={{ animationDuration: "120s" }}
          />
        </div>
      </div>

      {/* Peacock - Desktop only, right side with glow */}
      <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none">
        {/* Glow effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,180,150,0.2) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)",
            filter: "blur(50px)",
            animation: "pulseSlow 5s ease-in-out infinite",
          }}
        />
        <Image
          src={IMAGES.about.peacock}
          alt=""
          fill
          className="object-contain opacity-50"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(0,180,150,0.5)) drop-shadow(0 0 80px rgba(255,215,0,0.3))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Eyebrow with decorative elements */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Left ornament line */}
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
            }}
          />
          {/* Small diya icon */}
          <span className="text-lg sm:text-xl">🪔</span>
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] font-bold"
            style={{
              color: COLORS.BRIGHT_GOLD,
              textShadow: `0 0 20px rgba(255,215,0,0.5)`,
            }}
          >
            IIT (BHU) Varanasi Presents
          </p>
          {/* Small diya icon */}
          <span className="text-lg sm:text-xl">🪔</span>
          {/* Right ornament line */}
          <div
            className="h-[1px] w-12 sm:w-20"
            style={{
              background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
            }}
          />
        </div>

        {/* Main Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic mb-6"
          style={{
            fontFamily: "Georgia, serif",
            background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.BRIGHT_GOLD} 40%, ${COLORS.GOLD} 60%, ${COLORS.CREAM} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 4px 30px rgba(255,215,0,0.3)",
          }}
        >
          About Kashi Yatra
        </h1>

        {/* Tagline with royal styling */}
        <div className="mb-8">
          <p
            className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium"
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Where </span>
            <span
              style={{
                color: COLORS.BRIGHT_GOLD,
                textShadow: `0 0 20px rgba(255,215,0,0.4)`,
              }}
            >
              Tradition
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}> Meets </span>
            <span
              style={{
                color: COLORS.SAFFRON,
                textShadow: `0 0 20px rgba(255,107,0,0.4)`,
              }}
            >
              Celebration
            </span>
          </p>
          {/* Decorative underline */}
          <div className="flex justify-center mt-3">
            <div
              className="h-[2px] w-32 sm:w-48 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD}60, ${COLORS.SAFFRON}60, transparent)`,
              }}
            />
          </div>
        </div>

        <MysticDivider />
      </div>

      {/* Diya Cluster - Bottom center */}
      <div className="absolute -bottom-2 sm:bottom-0 left-1/2 -translate-x-1/2 w-56 sm:w-80 md:w-96 pointer-events-none opacity-80">
        <Image
          src={IMAGES.about.diyaCluster}
          alt=""
          width={500}
          height={350}
          className="w-full h-auto"
          style={{
            filter:
              "drop-shadow(0 0 30px rgba(255,180,50,0.6)) drop-shadow(0 0 60px rgba(255,150,50,0.3))",
          }}
        />
      </div>
    </section>
  );
});
