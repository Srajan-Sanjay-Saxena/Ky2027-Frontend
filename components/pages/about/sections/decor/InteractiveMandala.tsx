"use client";

import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/components/pages/about/constants/palette";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// INTERACTIVE MANDALA - Click/hover responsive sacred geometry
// ═══════════════════════════════════════════════════════════════════

interface RippleState {
  id: number;
  x: number;
  y: number;
}

export const InteractiveMandala = memo(function InteractiveMandala({
  size = 400,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const { shouldAnimate } = useAnimationPolicy();
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const [rippleCounter, setRippleCounter] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(shouldAnimate ? 120 : 0);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setRipples((prev) => [...prev, { id: rippleCounter, x, y }]);
      setRippleCounter((prev) => prev + 1);

      // Speed up rotation momentarily
      setRotationSpeed(30);
      setTimeout(() => setRotationSpeed(120), 2000);

      // Clean up ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleCounter));
      }, 2000);
    },
    [rippleCounter]
  );

  const petalCount = 12;
  const layerCount = 3;

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle, ${COLORS.BRIGHT_GOLD}30 0%, ${COLORS.SAFFRON}15 40%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        onClick={handleClick}
        style={{
          animation: `spin ${rotationSpeed}s linear infinite`,
        }}
      >
        <defs>
          <filter id="mandalaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} />
            <stop offset="100%" stopColor={COLORS.SAFFRON} />
          </linearGradient>

          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="0.8" />
            <stop offset="70%" stopColor={COLORS.SAFFRON} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={COLORS.BRIGHT_GOLD}
          strokeWidth="0.3"
          opacity={isHovered ? 0.5 : 0.2}
          className="transition-opacity duration-500"
        />

        {/* Mandala layers */}
        {Array.from({ length: layerCount }).map((_, layerIndex) => {
          const layerRadius = 35 - layerIndex * 10;
          const layerOpacity = isHovered ? 0.4 - layerIndex * 0.1 : 0.2 - layerIndex * 0.05;

          return (
            <g key={layerIndex}>
              {/* Petal ring */}
              {Array.from({ length: petalCount }).map((_, i) => {
                const angle = (i * 360) / petalCount;
                const radians = (angle * Math.PI) / 180;
                const x1 = 50 + Math.cos(radians) * (layerRadius - 5);
                const y1 = 50 + Math.sin(radians) * (layerRadius - 5);
                const x2 = 50 + Math.cos(radians) * layerRadius;
                const y2 = 50 + Math.sin(radians) * layerRadius;

                return (
                  <g key={`${layerIndex}-${i}`}>
                    {/* Petal line */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#petalGradient)"
                      strokeWidth="0.4"
                      opacity={layerOpacity}
                      filter="url(#mandalaGlow)"
                    />

                    {/* Petal node */}
                    <circle
                      cx={x2}
                      cy={y2}
                      r={isHovered ? "0.8" : "0.5"}
                      fill={COLORS.BRIGHT_GOLD}
                      opacity={layerOpacity + 0.2}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Connecting ring */}
              <circle
                cx="50"
                cy="50"
                r={layerRadius}
                fill="none"
                stroke={COLORS.BRIGHT_GOLD}
                strokeWidth="0.2"
                opacity={layerOpacity}
                strokeDasharray={isHovered ? "2,1" : "1,2"}
                className="transition-all duration-500"
              />
            </g>
          );
        })}

        {/* Center lotus/bindu */}
        <circle
          cx="50"
          cy="50"
          r={isHovered ? "6" : "4"}
          fill="url(#centerGlow)"
          className="transition-all duration-500"
        />
        <circle
          cx="50"
          cy="50"
          r={isHovered ? "2" : "1.5"}
          fill={COLORS.BRIGHT_GOLD}
          filter="url(#mandalaGlow)"
          className="transition-all duration-300"
        />

        {/* Sacred inner triangles (Sri Yantra inspired) */}
        <g opacity={isHovered ? 0.4 : 0.15} className="transition-opacity duration-500">
          {/* Upward triangle */}
          <polygon
            points="50,35 42,50 58,50"
            fill="none"
            stroke={COLORS.BRIGHT_GOLD}
            strokeWidth="0.3"
          />
          {/* Downward triangle */}
          <polygon
            points="50,55 42,45 58,45"
            fill="none"
            stroke={COLORS.SAFFRON}
            strokeWidth="0.3"
          />
        </g>

        {/* Click ripples */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.circle
              key={ripple.id}
              cx={ripple.x}
              cy={ripple.y}
              fill="none"
              stroke={COLORS.BRIGHT_GOLD}
              strokeWidth="0.3"
              initial={{ r: 0, opacity: 0.8 }}
              animate={{ r: 30, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Instruction text */}
      <motion.p
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: `${COLORS.BRIGHT_GOLD}80` }}
      >
        ✧ Click to awaken ✧
      </motion.p>
    </div>
  );
});
