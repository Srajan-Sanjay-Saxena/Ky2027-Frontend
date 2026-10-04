import { memo } from "react";
import Image from "next/image";
import { MandalaRing } from "@/components/pages/home/sections/FestHighlights/common/MandlaRing";
import { DiyaSvg } from "@/components/pages/home/sections/Hero/River/diya/DiyaSvg";
import { MotionZone } from "@/lib/motion";
import { IMAGES } from "@/lib/images";
import {
  GRADIENT_BORDER_ROYAL,
  GRADIENT_FOOTER_GLOW,
  GRADIENT_FOOTER_AMBIENT,
} from "@/components/pages/home/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND DECOR — Ethereal decorative elements for footer
// ═══════════════════════════════════════════════════════════════════
export const BackgroundDecor = memo(function BackgroundDecor() {
  return (
    <>
      {/* ═══ Subtle Rangoli Background Pattern - Desktop only ═══ */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={IMAGES.footer.subtleRangoli}
          alt=""
          fill
          className="object-cover"
          style={{
            opacity: 0.15,
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* ═══ Animated Background Mandala ═══ */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] sm:w-[60vw] sm:h-[60vw] max-w-[850px] max-h-[850px] pointer-events-none footer-mandala-slow"
        style={{ opacity: 0.25 }}
      >
        <MandalaRing className="w-full h-full text-[#FFD700]" />
      </div>

      {/* ═══ Floating Garland - Top - Desktop only ═══ */}
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1100px] h-[160px] pointer-events-none">
        <Image
          src={IMAGES.footer.floatingGarland}
          alt=""
          fill
          className="object-contain object-top"
          style={{
            opacity: 0.9,
            filter: "drop-shadow(0 5px 15px rgba(255,150,50,0.4))",
          }}
        />
      </div>

      {/* ═══ Ethereal Dancer - Left Side - Desktop only ═══ */}
      <div 
        className="hidden md:block absolute left-[6%] top-[0%] w-[500px] h-[700px] pointer-events-none z-[2] animate-fadeIn"
        style={{
          animation: "fadeInUp 1.5s ease-out forwards",
        }}
      >
        <Image
          src={IMAGES.footer.etherealDancer}
          alt=""
          fill
          className="object-contain"
          style={{
            opacity: 0.95,
            filter: "drop-shadow(0 0 30px rgba(255,180,100,0.5))",
          }}
        />
      </div>

      {/* ═══ Ghat Silhouette - Bottom - Desktop only ═══ */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-[150px] pointer-events-none z-[1]">
        <Image
          src={IMAGES.footer.ghatSilhouette}
          alt=""
          fill
          className="object-cover object-bottom"
          style={{
            opacity: 0.5,
            filter: "drop-shadow(0 -5px 20px rgba(255,180,100,0.3))",
          }}
        />
      </div>

      {/* ═══ Top Royal Border ═══ */}
      <div
        className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 z-10"
        style={{ background: GRADIENT_BORDER_ROYAL }}
      />

      {/* Secondary decorative line */}
      <div
        className="absolute top-2 sm:top-3 left-[10%] right-[10%] h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.3) 50%, transparent 100%)`,
        }}
      />

      {/* ═══ Gold Glow Overlay ═══ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: GRADIENT_FOOTER_GLOW }}
      />

      {/* ═══ Corner Diyas — Mobile only ═══ */}
      <MotionZone className="absolute inset-0 pointer-events-none sm:hidden">
        <div className="absolute top-14 left-[5%] w-8 h-10 opacity-70">
          <DiyaSvg className="w-full h-full" />
        </div>
        <div className="absolute top-16 right-[5%] w-6 h-8 opacity-50">
          <DiyaSvg className="w-full h-full" />
        </div>
      </MotionZone>

      {/* ═══ Floating Particles - Desktop only ═══ */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={`footer-particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${15 + Math.floor(i / 6) * 40}%`,
              background: i % 3 === 0 
                ? "radial-gradient(circle, #FFD700 0%, transparent 70%)"
                : i % 3 === 1
                  ? "radial-gradient(circle, #FFA500 0%, transparent 70%)"
                  : "radial-gradient(circle, #FF6B00 0%, transparent 70%)",
              animation: `floatParticle ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: "0 0 8px rgba(255,180,50,0.5)",
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </>
  );
});

// ═══════════════════════════════════════════════════════════════════
// AMBIENT GLOW — bottom ambient glow + side vignettes
// ═══════════════════════════════════════════════════════════════════
export const AmbientGlow = memo(function AmbientGlow() {
  return (
    <>
      {/* ═══ Bottom Ambient Glow ═══ */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[70%] h-24 sm:h-40 pointer-events-none"
        style={{ background: GRADIENT_FOOTER_AMBIENT }}
      />

      {/* Side vignettes - narrower to not cover pillars */}
      <div
        className="absolute top-0 left-0 w-[15%] h-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, rgba(26,5,8,0.5) 0%, transparent 100%)`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[15%] h-full pointer-events-none"
        style={{
          background: `linear-gradient(-90deg, rgba(26,5,8,0.5) 0%, transparent 100%)`,
        }}
      />

      {/* Top fade for seamless blend */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(26,5,8,0.4) 0%, transparent 100%)`,
        }}
      />
    </>
  );
});
