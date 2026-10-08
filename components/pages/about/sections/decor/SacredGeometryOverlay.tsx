"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// SACRED GEOMETRY OVERLAY - Sri Yantra inspired animations
// ═══════════════════════════════════════════════════════════════════

// Sri Yantra triangles configuration
const upwardTriangles = [
  { points: "50,5 15,75 85,75", delay: 0 },
  { points: "50,20 25,65 75,65", delay: 0.3 },
  { points: "50,30 32,58 68,58", delay: 0.6 },
  { points: "50,38 38,52 62,52", delay: 0.9 },
];

const downwardTriangles = [
  { points: "50,85 20,25 80,25", delay: 0.15 },
  { points: "50,72 28,32 72,32", delay: 0.45 },
  { points: "50,62 35,40 65,40", delay: 0.75 },
  { points: "50,55 42,46 58,46", delay: 1.05 },
];

// Lotus petal path generator
const createLotusPath = (
  centerX: number,
  centerY: number,
  radius: number,
  petalCount: number
): string => {
  let path = "";
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * 360) / petalCount - 90;
    const rad = (angle * Math.PI) / 180;
    const x1 = centerX + Math.cos(rad) * radius * 0.3;
    const y1 = centerY + Math.sin(rad) * radius * 0.3;
    const x2 = centerX + Math.cos(rad) * radius;
    const y2 = centerY + Math.sin(rad) * radius;
    const controlAngle1 = ((angle - 15) * Math.PI) / 180;
    const controlAngle2 = ((angle + 15) * Math.PI) / 180;
    const cx1 = centerX + Math.cos(controlAngle1) * radius * 0.7;
    const cy1 = centerY + Math.sin(controlAngle1) * radius * 0.7;
    const cx2 = centerX + Math.cos(controlAngle2) * radius * 0.7;
    const cy2 = centerY + Math.sin(controlAngle2) * radius * 0.7;

    path += `M${x1},${y1} Q${cx1},${cy1} ${x2},${y2} Q${cx2},${cy2} ${x1},${y1} `;
  }
  return path;
};

export const SacredGeometryOverlay = memo(function SacredGeometryOverlay({
  className = "",
  position = "center",
}: {
  className?: string;
  position?: "center" | "hero" | "cta";
}) {
  const { shouldAnimate } = useAnimationPolicy();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Don't render animated sacred geometry if animations should be reduced
  if (!shouldAnimate) return null;

  const positionClasses = {
    center: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    hero: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    cta: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3",
  };

  return (
    <div
      className={`pointer-events-none ${positionClasses[position]} ${className}`}
      style={{ width: "min(90vw, 600px)", height: "min(90vw, 600px)" }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          rotate: [0, 360],
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 2 },
          rotate: { duration: 300, repeat: Infinity, ease: "linear" },
        }}
      >
        <defs>
          <filter id="sriGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="triangleUp" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.1" />
            <stop offset="100%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="triangleDown" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.SAFFRON} stopOpacity="0.1" />
            <stop offset="100%" stopColor={COLORS.SAFFRON} stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="binduGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.8" />
            <stop offset="50%" stopColor={COLORS.SAFFRON} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Bhupura (square frame) */}
        <motion.rect
          x="5"
          y="5"
          width="90"
          height="90"
          fill="none"
          stroke={COLORS.BRIGHT_GOLD}
          strokeWidth="0.3"
          opacity="0.15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Three circles (triloka) */}
        {[40, 35, 30].map((r, i) => (
          <motion.circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={COLORS.BRIGHT_GOLD}
            strokeWidth="0.2"
            opacity={0.1 + i * 0.05}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
          />
        ))}

        {/* Lotus petals (16 outer) */}
        <motion.path
          d={createLotusPath(50, 50, 42, 16)}
          fill="none"
          stroke={COLORS.BRIGHT_GOLD}
          strokeWidth="0.15"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1 }}
        />

        {/* Lotus petals (8 inner) */}
        <motion.path
          d={createLotusPath(50, 50, 32, 8)}
          fill="none"
          stroke={COLORS.SAFFRON}
          strokeWidth="0.15"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />

        {/* Upward triangles (Shiva - masculine) */}
        {upwardTriangles.map((tri, i) => (
          <motion.polygon
            key={`up-${i}`}
            points={tri.points}
            fill="url(#triangleUp)"
            stroke={COLORS.BRIGHT_GOLD}
            strokeWidth="0.2"
            filter="url(#sriGlow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 + tri.delay }}
            style={{ transformOrigin: "center" }}
          />
        ))}

        {/* Downward triangles (Shakti - feminine) */}
        {downwardTriangles.map((tri, i) => (
          <motion.polygon
            key={`down-${i}`}
            points={tri.points}
            fill="url(#triangleDown)"
            stroke={COLORS.SAFFRON}
            strokeWidth="0.2"
            filter="url(#sriGlow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.15 + tri.delay }}
            style={{ transformOrigin: "center" }}
          />
        ))}

        {/* Bindu (central point) */}
        <motion.circle
          cx="50"
          cy="50"
          r="2"
          fill="url(#binduGlow)"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            delay: 3.5,
          }}
        />

        {/* Central dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="0.8"
          fill={COLORS.BRIGHT_GOLD}
          filter="url(#sriGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 4 }}
        />
      </motion.svg>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${COLORS.BRIGHT_GOLD}08 0%, transparent 50%)`,
        }}
      />
    </div>
  );
});
