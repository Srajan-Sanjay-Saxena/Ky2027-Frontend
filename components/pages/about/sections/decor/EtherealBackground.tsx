"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { COLORS } from "@/components/pages/about/constants/palette";

// ═══════════════════════════════════════════════════════════════════
// ETHEREAL BACKGROUND - Interactive constellations & sacred geometry
// ═══════════════════════════════════════════════════════════════════

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  brightness: number;
}

interface ConstellationLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Generate random stars
const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    brightness: Math.random() * 0.5 + 0.5,
  }));
};

// Sacred geometry constellation points (Sri Yantra inspired)
const constellationPoints = [
  { x: 50, y: 15 }, // Top
  { x: 25, y: 45 }, // Left upper
  { x: 75, y: 45 }, // Right upper
  { x: 15, y: 70 }, // Left lower
  { x: 85, y: 70 }, // Right lower
  { x: 50, y: 85 }, // Bottom center
  { x: 35, y: 60 }, // Inner left
  { x: 65, y: 60 }, // Inner right
  { x: 50, y: 50 }, // Center
];

// Lines connecting constellation
const constellationLines: ConstellationLine[] = [
  { id: 0, x1: 50, y1: 15, x2: 25, y2: 45 },
  { id: 1, x1: 50, y1: 15, x2: 75, y2: 45 },
  { id: 2, x1: 25, y1: 45, x2: 15, y2: 70 },
  { id: 3, x1: 75, y1: 45, x2: 85, y2: 70 },
  { id: 4, x1: 15, y1: 70, x2: 50, y2: 85 },
  { id: 5, x1: 85, y1: 70, x2: 50, y2: 85 },
  { id: 6, x1: 35, y1: 60, x2: 65, y2: 60 },
  { id: 7, x1: 50, y1: 50, x2: 35, y2: 60 },
  { id: 8, x1: 50, y1: 50, x2: 65, y2: 60 },
  { id: 9, x1: 50, y1: 50, x2: 50, y2: 15 },
];

// Ripple effect component
function Ripple({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <circle
      cx={x}
      cy={y}
      r="0"
      fill="none"
      stroke={COLORS.BRIGHT_GOLD}
      strokeWidth="0.5"
      opacity="0.6"
      className="animate-etherealRipple"
    />
  );
}

export const EtherealBackground = memo(function EtherealBackground() {
  const [stars] = useState(() => generateStars(80));
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const handleNodeClick = useCallback(
    (index: number, x: number, y: number) => {
      setActiveNode(index);
      setRipples((prev) => [...prev, { id: rippleId, x, y }]);
      setRippleId((prev) => prev + 1);

      // Reset active node after animation
      setTimeout(() => setActiveNode(null), 1000);
    },
    [rippleId]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, 
            rgba(139,21,56,0.15) 0%, 
            rgba(45,24,16,0.3) 40%, 
            transparent 70%
          )`,
        }}
      />

      {/* SVG Stars & Constellation */}
      <svg
        className="pointer-events-auto absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Star glow filter */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sacred node glow */}
          <filter id="sacredGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for active nodes */}
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor={COLORS.BRIGHT_GOLD} stopOpacity="1" />
            <stop offset="100%" stopColor={COLORS.SAFFRON} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background stars */}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size * 0.1}
            fill={COLORS.CREAM}
            opacity={star.brightness * 0.4}
            filter="url(#starGlow)"
            className="animate-twinkle"
            style={{ animationDelay: `${star.delay}s` }}
          />
        ))}

        {/* Constellation lines - appear on hover */}
        <g className="transition-opacity duration-1000" opacity="0.15">
          {constellationLines.map((line) => (
            <line
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLORS.BRIGHT_GOLD}
              strokeWidth="0.1"
              strokeDasharray="1,1"
              className="animate-constellationDraw"
              style={{ animationDelay: `${line.id * 0.2}s` }}
            />
          ))}
        </g>

        {/* Interactive constellation nodes */}
        {constellationPoints.map((point, i) => (
          <g
            key={i}
            onClick={() => handleNodeClick(i, point.x, point.y)}
            className="cursor-pointer"
          >
            {/* Outer pulse ring */}
            <circle
              cx={point.x}
              cy={point.y}
              r={activeNode === i ? "2" : "1"}
              fill="none"
              stroke={COLORS.BRIGHT_GOLD}
              strokeWidth="0.1"
              opacity={activeNode === i ? 0.8 : 0.2}
              className="transition-all duration-500"
            />

            {/* Inner sacred node */}
            <circle
              cx={point.x}
              cy={point.y}
              r={activeNode === i ? "0.6" : "0.3"}
              fill={activeNode === i ? COLORS.BRIGHT_GOLD : COLORS.CREAM}
              filter="url(#sacredGlow)"
              opacity={activeNode === i ? 1 : 0.5}
              className="transition-all duration-300 hover:opacity-100"
            />

            {/* Active state burst */}
            {activeNode === i && (
              <circle
                cx={point.x}
                cy={point.y}
                r="0"
                fill="url(#nodeGradient)"
                className="animate-nodeBurst"
              />
            )}
          </g>
        ))}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <Ripple
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            onComplete={() => removeRipple(ripple.id)}
          />
        ))}

        {/* Central Om symbol - purely decorative sacred geometry */}
        <g opacity="0.08" transform="translate(45, 45) scale(0.1)">
          <path
            d="M50,10 Q80,10 90,40 Q100,70 70,90 Q40,110 20,80 Q0,50 30,30 Q40,20 50,10"
            fill="none"
            stroke={COLORS.BRIGHT_GOLD}
            strokeWidth="3"
            className="animate-sacredBreath"
          />
        </g>
      </svg>

      {/* Floating particles layer */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="animate-floatParticle absolute h-1 w-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${COLORS.BRIGHT_GOLD}80 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
});
