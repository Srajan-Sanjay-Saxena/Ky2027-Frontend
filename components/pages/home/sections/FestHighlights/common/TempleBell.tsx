"use client";

import { memo } from "react";

interface TempleBellProps {
  className?: string;
  chainLength?: number;
  size?: "sm" | "md" | "lg";
  delayed?: boolean;
}

export const TempleBell = memo(function TempleBell({
  className = "",
  chainLength = 60,
  size = "md",
  delayed = false,
}: TempleBellProps) {
  const sizeMap = {
    sm: { width: 40, height: 55, viewBox: "0 0 60 80" },
    md: { width: 55, height: 75, viewBox: "0 0 60 80" },
    lg: { width: 70, height: 95, viewBox: "0 0 60 80" },
  };

  const { width, height, viewBox } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Attachment point at top */}
      <div
        className="w-2 h-3 rounded-b-sm"
        style={{
          background: "linear-gradient(180deg, #5C4033, #8B4513)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* Swinging container */}
      <div className={delayed ? "temple-bell-swing-delayed" : "temple-bell-swing"}>
        {/* Chain */}
        <div className="flex flex-col items-center">
          <div
            style={{
              width: 3,
              height: chainLength,
              background: "linear-gradient(180deg, #8B4513, #CD853F, #DAA520, #CD853F, #8B4513)",
              boxShadow: "0 0 6px rgba(218,165,32,0.4)",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Bell */}
        <div className="relative flex flex-col items-center">
          <svg width={width} height={height} viewBox={viewBox} className="drop-shadow-lg">
            <defs>
              <linearGradient id={`bellGrad-${delayed ? 'delayed' : 'main'}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B4513" />
                <stop offset="20%" stopColor="#CD853F" />
                <stop offset="40%" stopColor="#DAA520" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="60%" stopColor="#DAA520" />
                <stop offset="80%" stopColor="#CD853F" />
                <stop offset="100%" stopColor="#8B4513" />
              </linearGradient>
              <linearGradient id={`bellInner-${delayed ? 'delayed' : 'main'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A2810" />
                <stop offset="100%" stopColor="#2D1810" />
              </linearGradient>
              <filter id={`bellGlow-${delayed ? 'delayed' : 'main'}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Bell crown/top */}
            <ellipse cx="30" cy="6" rx="6" ry="3" fill={`url(#bellGrad-${delayed ? 'delayed' : 'main'})`} />
            <rect x="27" y="6" width="6" height="4" fill="#CD853F" />

            {/* Bell body - curved shape */}
            <path
              d="M24 10 Q22 25 20 40 Q17 55 12 68 L48 68 Q43 55 40 40 Q38 25 36 10 Z"
              fill={`url(#bellGrad-${delayed ? 'delayed' : 'main'})`}
              stroke="#8B4513"
              strokeWidth="0.5"
              filter={`url(#bellGlow-${delayed ? 'delayed' : 'main'})`}
            />

            {/* Bell rim - thick bottom edge */}
            <ellipse cx="30" cy="68" rx="18" ry="6" fill="#B8860B" />
            <ellipse cx="30" cy="68" rx="15" ry="4" fill={`url(#bellInner-${delayed ? 'delayed' : 'main'})`} />

            {/* Decorative bands */}
            <ellipse cx="30" cy="25" rx="10" ry="2" fill="#8B4513" opacity="0.5" />
            <ellipse cx="30" cy="45" rx="13" ry="2" fill="#8B4513" opacity="0.4" />

            {/* Bell clapper/tongue */}
            <line x1="30" y1="20" x2="30" y2="60" stroke="#4A2810" strokeWidth="3" strokeLinecap="round" />
            <circle cx="30" cy="62" r="6" fill="#5C4033" />
            <circle cx="30" cy="62" r="4" fill="#8B4513" />

            {/* Highlight reflection */}
            <ellipse cx="24" cy="35" rx="3" ry="10" fill="rgba(255,255,255,0.15)" />
          </svg>

          {/* Glow beneath bell */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: width * 1.5,
              height: 20,
              background: "radial-gradient(ellipse, rgba(255,215,0,0.35) 0%, rgba(255,165,0,0.15) 40%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </div>
    </div>
  );
});
