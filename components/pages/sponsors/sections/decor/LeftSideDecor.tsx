"use client";

import { motion } from "framer-motion";
import { COLORS, SHADOWS } from "../../constants/palette";

// ═══════════════════════════════════════════════════════════════════
// LEFT SIDE DECORATION - Stage/Theatrical Concert Theme
// ═══════════════════════════════════════════════════════════════════

export function LeftSideDecor() {
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-10 hidden h-full w-48 lg:block lg:w-64">
      {/* Stage curtain effect - dark green */}
      <div
        className="absolute inset-y-0 left-0 w-full"
        style={{
          background: `linear-gradient(90deg, 
            rgba(0, 50, 30, 0.5) 0%, 
            rgba(0, 40, 25, 0.3) 30%,
            transparent 100%
          )`,
        }}
      />

      {/* Curtain drape SVG */}
      <svg
        className="absolute top-0 left-0 h-full w-20 opacity-30"
        viewBox="0 0 50 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curtainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004d33" />
            <stop offset="50%" stopColor="#002d1a" />
            <stop offset="100%" stopColor="#001a0d" />
          </linearGradient>
        </defs>
        <path
          d="M0 0 Q25 50 15 100 Q5 150 20 200 Q35 250 10 300 Q-5 350 25 400 L0 400 Z"
          fill="url(#curtainGrad)"
        />
      </svg>

      {/* Spotlight beams from top */}
      <motion.div
        className="absolute -top-20 left-10 h-[400px] w-[150px] origin-top"
        style={{
          background: `linear-gradient(180deg, ${COLORS.NEON_PINK}25 0%, ${COLORS.NEON_PINK}05 50%, transparent 100%)`,
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
        }}
        animate={{
          rotate: [-15, 5, -15],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stage rope/rigging */}
      <div className="absolute top-0 left-12 h-full">
        <svg width="4" height="100%" className="opacity-40">
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100%"
            stroke={COLORS.GOLD}
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>
      </div>

      {/* Stage lights */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`light-l-${i}`}
          className="absolute"
          style={{
            left: 8,
            top: `${15 + i * 22}%`,
          }}
        >
          {/* Light fixture */}
          <div
            className="h-6 w-8 rounded-b-lg"
            style={{
              background: `linear-gradient(180deg, #1a1a1a 0%, #333 100%)`,
              boxShadow: SHADOWS.LIGHT_FIXTURE,
            }}
          />
          {/* Light glow */}
          <motion.div
            className="absolute top-6 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full"
            style={{
              background: [
                COLORS.NEON_PINK,
                COLORS.NEON_CYAN,
                COLORS.NEON_PURPLE,
                COLORS.NEON_LIME,
              ][i],
              boxShadow: `0 0 20px ${[COLORS.NEON_PINK, COLORS.NEON_CYAN, COLORS.NEON_PURPLE, COLORS.NEON_LIME][i]}, 0 0 40px ${[COLORS.NEON_PINK, COLORS.NEON_CYAN, COLORS.NEON_PURPLE, COLORS.NEON_LIME][i]}50`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        </motion.div>
      ))}

      {/* "LIVE" sign */}
      <motion.div
        className="absolute top-[85%] left-4 rounded px-3 py-1"
        style={{
          background: COLORS.NEON_LIME,
          boxShadow: `0 0 20px ${COLORS.NEON_LIME}, 0 0 40px ${COLORS.NEON_LIME}50`,
        }}
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        <span className="text-xs font-bold tracking-widest text-black">LIVE</span>
      </motion.div>

      {/* Decorative stars scattered */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`star-l-${i}`}
          className="absolute text-lg"
          style={{
            left: 30 + (i % 3) * 15,
            top: `${20 + i * 15}%`,
            color: COLORS.GOLD,
            filter: `drop-shadow(0 0 5px ${COLORS.GOLD})`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          ★
        </motion.div>
      ))}
    </div>
  );
}
