"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Z_INDEX } from "@/components/pages/passes/constants/palette";

// ============================================
// Floating Particles with Glow
// Pre-generated values to avoid hydration mismatch
// ============================================
const PARTICLE_CONFIG = {
  desktop: 30,
  mobile: 10,
};

// Pre-generate particle properties (deterministic, no hydration issues)
const PARTICLES = Array.from({ length: PARTICLE_CONFIG.desktop }, (_, i) => ({
  id: i,
  width: ((i * 7) % 5) + 2, // 2-6px
  height: ((i * 7) % 5) + 2,
  opacity: 0.2 + (i % 6) * 0.1, // 0.2-0.7
  left: (i * 37) % 100, // 0-99%
  top: (i * 41) % 100, // 0-99%
  shadowSize: 5 + (i % 10), // 5-14px
  yOffset: -50 - (i % 30), // -50 to -79
  xOffset: (i % 20) - 10, // -10 to 9
  duration: 6 + (i % 5), // 6-10s
  delay: i % 4, // 0-3s
}));

export const FloatingParticles = memo(function FloatingParticles({
  isMobile,
  isInView,
}: {
  isMobile: boolean;
  isInView: boolean;
}) {
  // Disable animated particles on mobile for better performance
  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: Z_INDEX.particles }}
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            background: `radial-gradient(circle, rgba(212, 168, 83, ${p.opacity}) 0%, transparent 70%)`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            boxShadow: `0 0 ${p.shadowSize}px rgba(212, 168, 83, 0.3)`,
          }}
          animate={
            isInView
              ? {
                  y: [0, p.yOffset, 0],
                  x: [0, p.xOffset, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }
              : undefined
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});
