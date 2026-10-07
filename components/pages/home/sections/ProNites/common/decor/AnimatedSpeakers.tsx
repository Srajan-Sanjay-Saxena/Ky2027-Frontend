"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";

export const AnimatedSpeakers = memo(function AnimatedSpeakers() {
  return (
    <div className="pointer-events-none absolute right-6 bottom-8 z-10 hidden items-end gap-3 lg:flex">
      {/* Left Speaker */}
      <div className="relative" style={{ transform: "rotate(-8deg)" }}>
        <svg
          width="90"
          height="130"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="130"
            rx="8"
            fill="url(#speakerGradient1)"
            stroke={CONCERT_COLORS.NEON_PURPLE}
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 15px ${CONCERT_COLORS.NEON_PURPLE}50)` }}
          />
          <rect
            x="12"
            y="12"
            width="76"
            height="116"
            rx="4"
            fill="url(#speakerInner1)"
            stroke={CONCERT_COLORS.NEON_PURPLE}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="35"
            r="12"
            fill="#1a1a2e"
            stroke={CONCERT_COLORS.NEON_PINK}
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="35"
            r="6"
            fill={CONCERT_COLORS.NEON_PINK}
            style={{
              animation: "speakerPulse 0.5s ease-in-out infinite alternate",
              filter: `drop-shadow(0 0 8px ${CONCERT_COLORS.NEON_PINK})`,
            }}
          />
          <circle
            cx="50"
            cy="85"
            r="32"
            fill="#0d0d20"
            stroke={CONCERT_COLORS.NEON_CYAN}
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="85"
            r="24"
            fill="#1a1a2e"
            stroke={CONCERT_COLORS.NEON_CYAN}
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <circle
            cx="50"
            cy="85"
            r="14"
            fill={CONCERT_COLORS.NEON_CYAN}
            fillOpacity="0.3"
            style={{
              animation: "speakerBass 0.3s ease-in-out infinite alternate",
              transformOrigin: "center",
            }}
          />
          <circle
            cx="50"
            cy="85"
            r="6"
            fill={CONCERT_COLORS.NEON_CYAN}
            style={{ filter: `drop-shadow(0 0 10px ${CONCERT_COLORS.NEON_CYAN})` }}
          />
          <defs>
            <linearGradient id="speakerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a1a35" />
              <stop offset="50%" stopColor="#1a0a25" />
              <stop offset="100%" stopColor="#0d0515" />
            </linearGradient>
            <linearGradient id="speakerInner1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0a0a15" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/2 -left-3 -translate-y-1/2" style={{ opacity: 0.6 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                width: `${18 + i * 12}px`,
                height: `${35 + i * 20}px`,
                borderColor: CONCERT_COLORS.NEON_PINK,
                left: `-${i * 6}px`,
                top: `${-17 - i * 10}px`,
                animation: `soundWave 1s ease-out infinite`,
                animationDelay: `${i * 0.15}s`,
                borderRightColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
                transform: "rotate(-20deg)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Speaker */}
      <div className="relative" style={{ transform: "rotate(5deg)" }}>
        <svg
          width="110"
          height="150"
          viewBox="0 0 100 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="130"
            rx="8"
            fill="url(#speakerGradient2)"
            stroke={CONCERT_COLORS.NEON_GOLD}
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 20px ${CONCERT_COLORS.NEON_GOLD}40)` }}
          />
          <rect
            x="12"
            y="12"
            width="76"
            height="116"
            rx="4"
            fill="url(#speakerInner2)"
            stroke={CONCERT_COLORS.NEON_GOLD}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <circle
            cx="50"
            cy="35"
            r="12"
            fill="#1a1a2e"
            stroke={CONCERT_COLORS.NEON_GOLD}
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="35"
            r="6"
            fill={CONCERT_COLORS.NEON_GOLD}
            style={{
              animation: "speakerPulse 0.4s ease-in-out infinite alternate",
              animationDelay: "0.1s",
              filter: `drop-shadow(0 0 10px ${CONCERT_COLORS.NEON_GOLD})`,
            }}
          />
          <circle
            cx="50"
            cy="85"
            r="32"
            fill="#0d0d20"
            stroke={CONCERT_COLORS.NEON_PINK}
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="85"
            r="24"
            fill="#1a1a2e"
            stroke={CONCERT_COLORS.NEON_PINK}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <circle
            cx="50"
            cy="85"
            r="14"
            fill={CONCERT_COLORS.NEON_PINK}
            fillOpacity="0.3"
            style={{
              animation: "speakerBass 0.25s ease-in-out infinite alternate",
              animationDelay: "0.05s",
              transformOrigin: "center",
            }}
          />
          <circle
            cx="50"
            cy="85"
            r="6"
            fill={CONCERT_COLORS.NEON_PINK}
            style={{ filter: `drop-shadow(0 0 12px ${CONCERT_COLORS.NEON_PINK})` }}
          />
          <defs>
            <linearGradient id="speakerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#352a1a" />
              <stop offset="50%" stopColor="#251a0a" />
              <stop offset="100%" stopColor="#15100a" />
            </linearGradient>
            <linearGradient id="speakerInner2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0a0a15" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-1/2 -right-3 -translate-y-1/2" style={{ opacity: 0.7 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                width: `${22 + i * 15}px`,
                height: `${45 + i * 25}px`,
                borderColor: CONCERT_COLORS.NEON_GOLD,
                right: `-${i * 8}px`,
                top: `${-22 - i * 12}px`,
                animation: `soundWave 0.8s ease-out infinite`,
                animationDelay: `${i * 0.12}s`,
                borderLeftColor: "transparent",
                borderTopColor: "transparent",
                borderBottomColor: "transparent",
                transform: "rotate(20deg)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
