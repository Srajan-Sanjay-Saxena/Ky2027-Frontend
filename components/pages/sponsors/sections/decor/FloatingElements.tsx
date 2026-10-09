"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/sponsors/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// FLOATING ELEMENTS - Scattered across the page
// ═══════════════════════════════════════════════════════════════════

export function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Floating geometric shapes - minimal */}
      <motion.div
        className="absolute top-[25%] left-[8%] h-10 w-10 rounded-lg border-2"
        style={{ borderColor: `${COLORS.NEON_GREEN}40` }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-[35%] right-[10%] h-6 w-6 border-2"
        style={{
          borderColor: `${COLORS.NEON_CYAN}40`,
          transform: "rotate(45deg)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-[65%] left-[6%] h-8 w-8 rounded-full border-2"
        style={{ borderColor: `${COLORS.NEON_LIME}35` }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-[70%] right-[8%] h-7 w-7 rounded-lg border-2"
        style={{ borderColor: `${COLORS.NEON_GREEN}40` }}
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating plus signs - reduced */}
      {[
        { x: "15%", y: "45%" },
        { x: "85%", y: "55%" },
      ].map((pos, i) => (
        <motion.div
          key={`plus-${i}`}
          className="absolute text-xl font-light"
          style={{
            left: pos.x,
            top: pos.y,
            color: `${COLORS.NEON_GREEN}30`,
          }}
          animate={{
            rotate: [0, 90, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        >
          +
        </motion.div>
      ))}

      {/* Floating dots - reduced */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${8 + ((i * 15) % 85)}%`,
            top: `${20 + ((i * 12) % 60)}%`,
            backgroundColor: [COLORS.NEON_GREEN, COLORS.NEON_CYAN, COLORS.NEON_LIME][i % 3],
            boxShadow: `0 0 4px ${[COLORS.NEON_GREEN, COLORS.NEON_CYAN, COLORS.NEON_LIME][i % 3]}`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
