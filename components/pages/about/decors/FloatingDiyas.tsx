"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// FLOATING DIYAS - Click to light, interactive spiritual element
// ═══════════════════════════════════════════════════════════════════

interface DiyaState {
  id: number;
  x: number;
  y: number;
  isLit: boolean;
  scale: number;
  floatOffset: number;
}

// SVG Diya component
const DiyaSVG = memo(function DiyaSVG({ isLit, size = 40 }: { isLit: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 60 50" width={size} height={size * 0.83} className="overflow-visible">
      <defs>
        <filter id="flameGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="diyaBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>

        <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="flameGradient" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Diya bowl */}
      <ellipse
        cx="30"
        cy="38"
        rx="20"
        ry="8"
        fill="url(#diyaBody)"
        stroke="#8B6914"
        strokeWidth="1"
      />

      {/* Oil surface */}
      <ellipse cx="30" cy="35" rx="16" ry="5" fill="url(#oilGradient)" />

      {/* Wick */}
      <rect x="28" y="28" width="4" height="8" fill="#4A3728" rx="1" />

      {/* Flame (only when lit) */}
      <AnimatePresence>
        {isLit && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Flame glow aura */}
            <ellipse
              cx="30"
              cy="15"
              rx="12"
              ry="15"
              fill={COLORS.BRIGHT_GOLD}
              opacity="0.2"
              filter="url(#flameGlow)"
              className="animate-flameFlicker"
            />

            {/* Main flame */}
            <motion.path
              d="M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5"
              fill="url(#flameGradient)"
              filter="url(#flameGlow)"
              animate={{
                d: [
                  "M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5",
                  "M30,3 Q36,10 34,18 Q32,24 30,28 Q28,24 26,18 Q24,10 30,3",
                  "M30,6 Q34,13 32,21 Q30,26 30,28 Q30,26 28,21 Q26,13 30,6",
                  "M30,5 Q35,12 33,20 Q31,25 30,28 Q29,25 27,20 Q25,12 30,5",
                ],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner flame core */}
            <motion.ellipse
              cx="30"
              cy="18"
              rx="3"
              ry="6"
              fill="#FFFFFF"
              opacity="0.9"
              animate={{
                ry: [6, 5, 7, 6],
                opacity: [0.9, 0.7, 0.9, 0.9],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Decorative base pattern */}
      <path
        d="M15,42 Q20,46 30,46 Q40,46 45,42"
        fill="none"
        stroke="#8B6914"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
});

// Individual floating diya
const FloatingDiya = memo(function FloatingDiya({
  diya,
  onToggle,
  prefersReducedMotion,
}: {
  diya: DiyaState;
  onToggle: (id: number) => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${diya.x}%`,
        top: `${diya.y}%`,
        transform: `translate(-50%, -50%) scale(${diya.scale})`,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -10, 0],
            }
      }
      transition={{
        duration: 4 + diya.floatOffset,
        repeat: Infinity,
        ease: "easeInOut",
        delay: diya.floatOffset,
      }}
      onClick={() => onToggle(diya.id)}
      whileHover={{ scale: diya.scale * 1.2 }}
      whileTap={{ scale: diya.scale * 0.9 }}
    >
      {/* Light halo (when lit) */}
      <AnimatePresence>
        {diya.isLit && (
          <motion.div
            className="pointer-events-none absolute -inset-8 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              background: `radial-gradient(circle, ${COLORS.BRIGHT_GOLD}40 0%, ${COLORS.SAFFRON}20 40%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <DiyaSVG isLit={diya.isLit} size={45} />

      {/* Tooltip */}
      <motion.span
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ color: `${COLORS.BRIGHT_GOLD}80` }}
      >
        {diya.isLit ? "✧ Blessed ✧" : "Click to light"}
      </motion.span>
    </motion.div>
  );
});

// Main component with multiple diyas
export const FloatingDiyas = memo(function FloatingDiyas({
  className = "",
}: {
  className?: string;
}) {
  const { shouldAnimate } = useAnimationPolicy();
  const [diyas, setDiyas] = useState<DiyaState[]>([
    { id: 1, x: 10, y: 20, isLit: false, scale: 0.8, floatOffset: 0 },
    { id: 2, x: 90, y: 25, isLit: false, scale: 0.9, floatOffset: 1.5 },
    { id: 3, x: 5, y: 60, isLit: false, scale: 0.7, floatOffset: 0.8 },
    { id: 4, x: 95, y: 65, isLit: false, scale: 0.85, floatOffset: 2 },
    { id: 5, x: 15, y: 85, isLit: false, scale: 0.75, floatOffset: 1.2 },
    { id: 6, x: 85, y: 88, isLit: false, scale: 0.8, floatOffset: 0.5 },
  ]);

  const [allLitMessage, setAllLitMessage] = useState(false);

  const toggleDiya = useCallback((id: number) => {
    setDiyas((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, isLit: !d.isLit } : d));

      // Check if all diyas are lit
      if (updated.every((d) => d.isLit)) {
        setAllLitMessage(true);
        setTimeout(() => setAllLitMessage(false), 3000);
      }

      return updated;
    });
  }, []);

  const litCount = diyas.filter((d) => d.isLit).length;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[5] ${className}`}>
      {/* Counter */}
      <motion.div
        className="pointer-events-auto fixed bottom-4 left-4 rounded-full px-4 py-2"
        style={{
          background: `${COLORS.BG_DEEP}dd`,
          border: `1px solid ${COLORS.BRIGHT_GOLD}40`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-sm font-medium" style={{ color: COLORS.BRIGHT_GOLD }}>
          🪔 {litCount}/{diyas.length} Diyas Lit
        </span>
      </motion.div>

      {/* All lit celebration message */}
      <AnimatePresence>
        {allLitMessage && (
          <motion.div
            className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 rounded-lg px-8 py-4 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_DEEP}ee, ${COLORS.MAROON}dd)`,
              border: `2px solid ${COLORS.BRIGHT_GOLD}`,
              boxShadow: `0 0 40px ${COLORS.BRIGHT_GOLD}40`,
            }}
          >
            <p className="mb-1 text-xl font-bold" style={{ color: COLORS.BRIGHT_GOLD }}>
              ✨ शुभ दीपावली ✨
            </p>
            <p className="text-sm" style={{ color: COLORS.CREAM }}>
              All diyas illuminated. May light guide your path.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating diyas */}
      {diyas.map((diya) => (
        <div key={diya.id} className="pointer-events-auto">
          <FloatingDiya diya={diya} onToggle={toggleDiya} prefersReducedMotion={shouldAnimate} />
        </div>
      ))}
    </div>
  );
});
