"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { PassCard, PassesHeading } from "./common";
import { PASSES, ANIMATION } from "./config/passes.config";
import { Z_INDEX } from "./constants/theme";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks";
import {
  COLORS,
  GRADIENT_BORDER_ORNATE,
} from "@/components/pages/home/constants/palette";
import { BanarasiPatternAnimated, GeometricPattern, VignetteOverlay } from "./desktop/BackgroundDecor";
import { MandalaRing } from "./desktop/MandalaRing";
import { FloatingParticles } from "./desktop/FloatingParticles";

// ============================================
// Animation Variants
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...ANIMATION.stagger, when: "beforeChildren" },
  },
};

// ============================================
// Main PassesSection Component
// ============================================
export function PassesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mandalaLeftRef = useRef<HTMLDivElement>(null);
  const mandalaRightRef = useRef<HTMLDivElement>(null);
  const mandalaCenterRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  useEffect(() => {
    // Skip GSAP animations if user prefers reduced motion
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Only run mandala animations when in view
      if (isInView) {
        gsap.to(mandalaLeftRef.current, {
          rotation: 360,
          duration: 80,
          repeat: -1,
          ease: "none",
        });
        gsap.to(mandalaRightRef.current, {
          rotation: -360,
          duration: 100,
          repeat: -1,
          ease: "none",
        });
        gsap.to(mandalaCenterRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, prefersReducedMotion]);

  const handleSelect = useCallback((passId: string) => {
    console.log(`Selected pass: ${passId}`);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-8 md:py-16 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg,
            #0a0510 0%,
            #120818 10%,
            #1a0c22 25%,
            #22102c 40%,
            #2a1435 50%,
            #22102c 60%,
            #1a0c22 75%,
            #120818 90%,
            #0a0510 100%
          )
        `,
      }}
    >
      {/* Top ornate border */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "80px",
          background: `linear-gradient(180deg, rgba(212, 168, 83, 0.12) 0%, transparent 100%)`,
          borderTop: "3px solid transparent",
          borderImage: `${GRADIENT_BORDER_ORNATE} 1`,
          zIndex: Z_INDEX.topBorder,
        }}
      />

      {/* Animated patterns */}
      <GeometricPattern />
      <BanarasiPatternAnimated isMobile={isMobile} />

      {/* Left Mandala - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaLeftRef}
          className="absolute -left-[15%] top-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] pointer-events-none"
          style={{ zIndex: Z_INDEX.mandala, opacity: 0.08, color: COLORS.GOLD }}
        >
          <MandalaRing className="w-full h-full" />
        </div>
      )}

      {/* Right Mandala - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaRightRef}
          className="absolute -right-[15%] bottom-[10%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] pointer-events-none"
          style={{
            zIndex: Z_INDEX.mandala,
            opacity: 0.06,
            color: COLORS.BRIGHT_GOLD,
          }}
        >
          <MandalaRing className="w-full h-full" />
        </div>
      )}

      {/* Center Mandala (behind cards) - hidden on mobile */}
      {!isMobile && (
        <div
          ref={mandalaCenterRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none"
          style={{ zIndex: 1, opacity: 0.03, color: COLORS.GOLD }}
        >
          <MandalaRing className="w-full h-full" />
        </div>
      )}

      {/* Floating particles */}
      <FloatingParticles isMobile={isMobile} isInView={isInView} />

      {/* Vignette */}
      <VignetteOverlay />

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24"
        style={{ zIndex: Z_INDEX.cards }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Heading */}
        <PassesHeading isMobile={isMobile} />

        {/* Hover instruction */}
        <motion.p
          className="text-center text-gray-500 text-sm mb-8 hidden sm:block"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5 } },
          }}
        >
          [ HOVER TO SEE BENEFITS ]
        </motion.p>

        {/* Pass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10 justify-items-center items-end">
          {PASSES.map((pass, index) => (
            <PassCard
              key={pass.id}
              pass={pass}
              index={index}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Mobile tap instruction */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-8 sm:hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5 } },
          }}
        >
          [ TAP TO SEE BENEFITS ]
        </motion.p>

        {/* Footer note */}
        <motion.p
          className="text-center text-gray-600 text-sm mt-12"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.8 } },
          }}
        >
          * All passes include entry to the 3-day festival. Prices inclusive of
          all taxes.
        </motion.p>
      </motion.div>

      {/* Bottom ornate border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: GRADIENT_BORDER_ORNATE }}
      />
    </section>
  );
}
