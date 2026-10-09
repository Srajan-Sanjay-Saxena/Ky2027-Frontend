"use client";

import { motion } from "framer-motion";
import { COLORS, SHADOWS } from "@/components/pages/sponsors/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// RIGHT SIDE DECORATION - Stage/Theatrical Concert Theme
// ═══════════════════════════════════════════════════════════════════

export function RightSideDecor() {
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-10 hidden h-full w-48 overflow-hidden lg:block lg:w-64">
      {/* Stage curtain effect - dark green mirrored */}
      <div
        className="absolute inset-y-0 right-0 w-full"
        style={{
          background: `linear-gradient(-90deg, 
            rgba(0, 50, 30, 0.5) 0%, 
            rgba(0, 40, 25, 0.3) 30%,
            transparent 100%
          )`,
        }}
      />

      {/* Curtain drape SVG - mirrored */}
      <svg
        className="absolute top-0 right-0 h-full w-20 opacity-30"
        viewBox="0 0 50 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curtainGradR" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#004d33" />
            <stop offset="50%" stopColor="#002d1a" />
            <stop offset="100%" stopColor="#001a0d" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 Q25 50 35 100 Q45 150 30 200 Q15 250 40 300 Q55 350 25 400 L50 400 Z"
          fill="url(#curtainGradR)"
        />
      </svg>

      {/* Spotlight beams from top */}
      <motion.div
        className="absolute -top-20 right-10 h-[400px] w-[150px] origin-top"
        style={{
          background: `linear-gradient(180deg, ${COLORS.NEON_CYAN}25 0%, ${COLORS.NEON_CYAN}05 50%, transparent 100%)`,
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
        }}
        animate={{
          rotate: [15, -5, 15],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Stage rope/rigging */}
      <div className="absolute top-0 right-12 h-full">
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
          key={`light-r-${i}`}
          className="absolute"
          style={{
            right: 8,
            top: `${18 + i * 20}%`,
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
                COLORS.NEON_CYAN,
                COLORS.NEON_LIME,
                COLORS.NEON_PINK,
                COLORS.NEON_PURPLE,
              ][i],
              boxShadow: `0 0 20px ${[COLORS.NEON_CYAN, COLORS.NEON_LIME, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i]}, 0 0 40px ${[COLORS.NEON_CYAN, COLORS.NEON_LIME, COLORS.NEON_PINK, COLORS.NEON_PURPLE][i]}50`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        </motion.div>
      ))}

      {/* "ON AIR" sign */}
      <motion.div
        className="absolute top-[85%] right-4 rounded px-3 py-1"
        style={{
          background: COLORS.NEON_CYAN,
          boxShadow: `0 0 20px ${COLORS.NEON_CYAN}, 0 0 40px ${COLORS.NEON_CYAN}50`,
        }}
        animate={{
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        <span className="text-xs font-bold tracking-widest text-black">ON AIR</span>
      </motion.div>

      {/* VIP badge */}
      <motion.div
        className="absolute top-[10%] right-6"
        animate={{
          y: [0, -5, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div
          className="rounded-lg border-2 px-4 py-2"
          style={{
            borderColor: COLORS.NEON_GREEN,
            background: `linear-gradient(135deg, rgba(0,255,102,0.2) 0%, rgba(0,255,102,0.05) 100%)`,
            boxShadow: `0 0 15px ${COLORS.NEON_GREEN}40`,
          }}
        >
          <span
            className="text-sm font-black tracking-[0.2em]"
            style={{ color: COLORS.NEON_GREEN }}
          >
            VIP
          </span>
        </div>
      </motion.div>

      {/* Ticket stub decoration */}
      <div
        className="absolute top-[50%] right-8 h-20 w-12 rounded-lg opacity-60"
        style={{
          background: `linear-gradient(135deg, ${COLORS.NEON_CYAN}30 0%, ${COLORS.NEON_GREEN}20 100%)`,
          border: `1px dashed ${COLORS.NEON_CYAN}50`,
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <span className="text-[8px] tracking-wider text-white/60">ADMIT</span>
          <span className="text-lg font-bold" style={{ color: COLORS.NEON_CYAN }}>
            1
          </span>
        </div>
      </div>

      {/* Decorative stars scattered */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`star-r-${i}`}
          className="absolute text-lg"
          style={{
            right: 35 + (i % 3) * 12,
            top: `${25 + i * 14}%`,
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
            delay: i * 0.3 + 0.5,
          }}
        >
          ★
        </motion.div>
      ))}
    </div>
  );
}
