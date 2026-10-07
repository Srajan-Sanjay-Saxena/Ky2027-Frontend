"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// GANGA FLOW LINE - Horizontal flowing line (for dividers)
// ═══════════════════════════════════════════════════════════════════

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
