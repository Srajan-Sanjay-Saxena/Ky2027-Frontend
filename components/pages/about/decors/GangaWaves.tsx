"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// GANGA WAVES - Flowing river animation for sections
// ═══════════════════════════════════════════════════════════════════

export const GangaWaves = memo(function GangaWaves({
  className = "",
  position = "bottom",
  color = "gold",
}: {
  className?: string;
  position?: "top" | "bottom";
  color?: "gold" | "cyan" | "mixed";
}) {
  const { shouldAnimate } = useAnimationPolicy();

  // Don't render animated waves if animations should be reduced
  if (!shouldAnimate) return null;

  const colors = {
    gold: {
      primary: COLORS.BRIGHT_GOLD,
      secondary: COLORS.SAFFRON,
    },
    cyan: {
      primary: "#00CED1",
      secondary: "#20B2AA",
    },
    mixed: {
      primary: COLORS.BRIGHT_GOLD,
      secondary: "#00CED1",
    },
  };

  const { primary, secondary } = colors[color];

  const positionStyles = position === "bottom" ? "bottom-0 left-0" : "top-0 left-0 rotate-180";

  return (
    <div
      className={`absolute ${positionStyles} pointer-events-none h-32 w-full overflow-hidden ${className}`}
    >
      <svg
        className="absolute bottom-0 h-full w-[200%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`waveGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.2" />
            <stop offset="50%" stopColor={secondary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={primary} stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id={`waveGradient2-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondary} stopOpacity="0.15" />
            <stop offset="50%" stopColor={primary} stopOpacity="0.25" />
            <stop offset="100%" stopColor={secondary} stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Wave layer 1 - slowest, back */}
        <motion.path
          d="M0,192 C160,160 320,224 480,192 C640,160 800,224 960,192 C1120,160 1280,224 1440,192 L1440,320 L0,320 Z"
          fill={`url(#waveGradient-${color})`}
          animate={{
            x: [-720, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Wave layer 2 - medium speed */}
        <motion.path
          d="M0,224 C120,192 240,256 360,224 C480,192 600,256 720,224 C840,192 960,256 1080,224 C1200,192 1320,256 1440,224 L1440,320 L0,320 Z"
          fill={`url(#waveGradient2-${color})`}
          animate={{
            x: [-720, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Wave layer 3 - fastest, front */}
        <motion.path
          d="M0,256 C100,240 200,272 300,256 C400,240 500,272 600,256 C700,240 800,272 900,256 C1000,240 1100,272 1200,256 C1300,240 1400,272 1440,256 L1440,320 L0,320 Z"
          fill={primary}
          fillOpacity="0.1"
          animate={{
            x: [-720, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Sparkle layer - floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={i * 100 + 50}
            cy={220 + Math.sin(i) * 30}
            r="2"
            fill={i % 2 === 0 ? primary : secondary}
            opacity="0.6"
            animate={{
              x: [-720, 720],
              y: [0, -20, 0, 20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              x: { duration: 20, repeat: Infinity, ease: "linear", delay: i * 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </svg>

      {/* Glow effect at the edge */}
      <div
        className="absolute bottom-0 left-0 h-16 w-full"
        style={{
          background: `linear-gradient(to top, ${primary}15 0%, transparent 100%)`,
        }}
      />
    </div>
  );
});

// Horizontal flowing line version (for dividers)
export const GangaFlowLine = memo(function GangaFlowLine({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative h-8 w-full overflow-hidden ${className}`}>
      <svg className="absolute h-full w-[200%]" viewBox="0 0 200 20" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0" />
            <stop offset="20%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.6" />
            <stop offset="50%" stopColor={COLORS.SAFFRON} stopOpacity="0.8" />
            <stop offset="80%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.6" />
            <stop offset="100%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0" />
          </linearGradient>

          <filter id="flowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Flowing line */}
        <motion.path
          d="M0,10 Q25,5 50,10 T100,10 T150,10 T200,10"
          fill="none"
          stroke="url(#flowLineGradient)"
          strokeWidth="1.5"
          filter="url(#flowGlow)"
          animate={{
            x: [-100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Decorative dots */}
        {[0, 50, 100, 150, 200].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="10"
            r="2"
            fill={COLORS.BRIGHT_GOLD}
            opacity="0.5"
            filter="url(#flowGlow)"
            animate={{
              x: [-100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              x: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
          />
        ))}
      </svg>
    </div>
  );
});
