"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { IMAGES } from "@/lib/images";
import { COLORS } from "@/components/pages/home/constants/palette";
import { CornerOrnaments } from "./CornerOrnaments";
import { MysticDivider } from "./MysticDivider";

// ═══════════════════════════════════════════════════════════════════
// CALL TO ACTION
// ═══════════════════════════════════════════════════════════════════
export const CTASection = memo(function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
      {/* Decorative Peacock - Left side - Desktop only, LARGE with intense glow */}
      <div className="hidden lg:block absolute -left-[200px] -bottom-[200px] w-[800px] h-[1000px] pointer-events-none -scale-x-100">
        {/* Intense glow effect behind peacock */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 60% 60%, rgba(0,180,150,0.25) 0%, rgba(50,200,180,0.15) 30%, rgba(255,215,0,0.1) 50%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulseSlow 4s ease-in-out infinite",
          }}
        />
        <Image
          src={IMAGES.about.peacock}
          alt=""
          fill
          className="object-contain opacity-60"
          style={{
            filter:
              "drop-shadow(0 0 50px rgba(0,180,150,0.6)) drop-shadow(0 0 100px rgba(255,215,0,0.4)) drop-shadow(0 0 150px rgba(0,150,130,0.3))",
          }}
        />
      </div>

      {/* Decorative Peacock - Right side - Desktop only, LARGE with intense glow */}
      <div className="hidden lg:block absolute -right-[200px] -bottom-[200px] w-[800px] h-[1000px] pointer-events-none">
        {/* Intense glow effect behind peacock */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, rgba(0,180,150,0.25) 0%, rgba(50,200,180,0.15) 30%, rgba(255,215,0,0.1) 50%, transparent 70%)",
            filter: "blur(60px)",
            animation: "pulseSlow 4s ease-in-out infinite 2s",
          }}
        />
        <Image
          src={IMAGES.about.peacock}
          alt=""
          fill
          className="object-contain opacity-60"
          style={{
            filter:
              "drop-shadow(0 0 50px rgba(0,180,150,0.6)) drop-shadow(0 0 100px rgba(255,215,0,0.4)) drop-shadow(0 0 150px rgba(0,150,130,0.3))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Ornate Frame Container */}
        <div
          className="relative p-8 sm:p-12 md:p-16"
          style={{
            background: `linear-gradient(180deg, 
              rgba(139,21,56,0.2) 0%, 
              rgba(45,24,16,0.3) 50%, 
              rgba(139,21,56,0.2) 100%
            )`,
            border: `2px solid ${COLORS.BRIGHT_GOLD}40`,
            boxShadow: `
              0 0 60px rgba(255,215,0,0.1),
              inset 0 0 60px rgba(139,21,56,0.2)
            `,
          }}
        >
          {/* Corner Ornaments */}
          <CornerOrnaments />

          {/* Top decorative mandala element */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src={IMAGES.about.omLotus}
              alt=""
              width={80}
              height={80}
              className="w-full h-full object-contain"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,100,150,0.5))" }}
            />
          </div>

          {/* Decorative top border */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD}, transparent)`,
            }}
          />

          {/* Inner glow orbs - Desktop only */}
          <div
            className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)`,
              filter: "blur(30px)",
            }}
          />
          <div
            className="hidden sm:block absolute top-1/2 right-0 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)`,
              filter: "blur(30px)",
            }}
          />

          {/* Sanskrit-style decorative text */}
          <p
            className="text-center text-xs sm:text-sm tracking-[0.5em] mb-4 uppercase"
            style={{ color: `${COLORS.BRIGHT_GOLD}80` }}
          >
            ॐ श्री काशी यात्रा ॐ
          </p>

          {/* Main Title with ornate styling */}
          <h2
            className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic mb-6"
            style={{
              fontFamily: "Georgia, serif",
              background: `linear-gradient(180deg, 
                ${COLORS.CREAM} 0%, 
                ${COLORS.BRIGHT_GOLD} 30%, 
                #D4A853 50%,
                ${COLORS.BRIGHT_GOLD} 70%,
                ${COLORS.CREAM} 100%
              )`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 30px rgba(255,215,0,0.4)",
            }}
          >
            Be Part of the Journey
          </h2>

          {/* Decorative divider under title */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="h-[1px] w-12 sm:w-20"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD})`,
              }}
            />
            <span style={{ color: COLORS.BRIGHT_GOLD }}>❈</span>
            <div
              className="h-[1px] w-8 sm:w-12"
              style={{ background: COLORS.BRIGHT_GOLD }}
            />
            <span style={{ color: COLORS.BRIGHT_GOLD }}>◆</span>
            <div
              className="h-[1px] w-8 sm:w-12"
              style={{ background: COLORS.BRIGHT_GOLD }}
            />
            <span style={{ color: COLORS.BRIGHT_GOLD }}>❈</span>
            <div
              className="h-[1px] w-12 sm:w-20"
              style={{
                background: `linear-gradient(90deg, ${COLORS.BRIGHT_GOLD}, transparent)`,
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="text-center text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              color: COLORS.CREAM,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Embark upon a sacred voyage through{" "}
            <span style={{ color: COLORS.BRIGHT_GOLD, fontWeight: 600 }}>
              art
            </span>
            ,{" "}
            <span style={{ color: COLORS.SAFFRON, fontWeight: 600 }}>
              music
            </span>
            , and{" "}
            <span style={{ color: COLORS.BRIGHT_GOLD, fontWeight: 600 }}>
              culture
            </span>{" "}
            — where ancient traditions dance with youthful spirits.
          </p>

          {/* Royal Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
            {/* Primary Button - Ornate Gold */}
            <Link href="/events" className="group relative w-full sm:w-auto">
              {/* Outer glow */}
              <div
                className="absolute -inset-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD}50, ${COLORS.SAFFRON}30)`,
                  filter: "blur(10px)",
                }}
              />

              <div
                className="relative px-10 sm:px-14 py-4 sm:py-5 text-center overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, 
                    #FFD700 0%, 
                    #E8B820 20%,
                    #D4A853 50%,
                    #B8860B 80%,
                    #8B6914 100%
                  )`,
                  border: `3px solid #8B6914`,
                  boxShadow: `
                    0 8px 32px rgba(255,215,0,0.4),
                    0 4px 16px rgba(0,0,0,0.3),
                    inset 0 2px 4px rgba(255,255,255,0.4),
                    inset 0 -2px 4px rgba(0,0,0,0.2)
                  `,
                }}
              >
                {/* Shimmer animation */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
                    animation: "shimmer 3s infinite",
                  }}
                />

                {/* Inner ornate border */}
                <div
                  className="absolute inset-2 pointer-events-none"
                  style={{ border: `1px solid rgba(255,255,255,0.3)` }}
                />

                {/* Corner flourishes */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/60" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/60" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/60" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/60" />

                <span
                  className="relative z-10 font-bold text-sm sm:text-base uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  style={{
                    color: "#1a0a14",
                    textShadow: "0 1px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  <span className="text-lg">🎭</span>
                  <span>Explore Events</span>
                  <span className="text-lg">🎭</span>
                </span>
              </div>
            </Link>

            {/* Secondary Button - Royal Maroon with Gold */}
            <Link href="/passes" className="group relative w-full sm:w-auto">
              {/* Outer glow on hover */}
              <div
                className="absolute -inset-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.BRIGHT_GOLD}30, ${COLORS.MAROON}20)`,
                  filter: "blur(10px)",
                }}
              />

              <div
                className="relative px-10 sm:px-14 py-4 sm:py-5 text-center overflow-hidden transition-all duration-300"
                style={{
                  background: `linear-gradient(180deg, 
                    rgba(139,21,56,0.4) 0%, 
                    rgba(90,15,37,0.5) 50%,
                    rgba(139,21,56,0.4) 100%
                  )`,
                  border: `3px solid ${COLORS.BRIGHT_GOLD}`,
                  boxShadow: `
                    0 8px 32px rgba(255,215,0,0.15),
                    0 4px 16px rgba(0,0,0,0.3),
                    inset 0 0 40px rgba(255,215,0,0.05)
                  `,
                }}
              >
                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.05) 100%)`,
                  }}
                />

                {/* Inner ornate border */}
                <div
                  className="absolute inset-2 pointer-events-none"
                  style={{ border: `1px solid ${COLORS.BRIGHT_GOLD}30` }}
                />

                {/* Corner flourishes */}
                <span
                  className="absolute top-2 left-2 w-3 h-3 border-t border-l"
                  style={{ borderColor: `${COLORS.BRIGHT_GOLD}60` }}
                />
                <span
                  className="absolute top-2 right-2 w-3 h-3 border-t border-r"
                  style={{ borderColor: `${COLORS.BRIGHT_GOLD}60` }}
                />
                <span
                  className="absolute bottom-2 left-2 w-3 h-3 border-b border-l"
                  style={{ borderColor: `${COLORS.BRIGHT_GOLD}60` }}
                />
                <span
                  className="absolute bottom-2 right-2 w-3 h-3 border-b border-r"
                  style={{ borderColor: `${COLORS.BRIGHT_GOLD}60` }}
                />

                <span
                  className="relative z-10 font-bold text-sm sm:text-base uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  style={{
                    color: COLORS.BRIGHT_GOLD,
                    textShadow: `0 0 20px rgba(255,215,0,0.3)`,
                  }}
                >
                  <span className="text-lg">🎫</span>
                  <span>Get Passes</span>
                  <span className="text-lg">🎫</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-10 flex justify-center">
            <Image
              src={IMAGES.about.diyaCluster}
              alt=""
              width={200}
              height={120}
              className="w-32 sm:w-40 h-auto opacity-70"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,180,50,0.5))" }}
            />
          </div>

          {/* Decorative bottom border */}
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.BRIGHT_GOLD}, transparent)`,
            }}
          />
        </div>
      </div>

      <MysticDivider className="mt-16" />
    </section>
  );
});
