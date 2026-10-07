"use client";

import { memo } from "react";
import { CONCERT_COLORS } from "@/components/pages/home/sections/ProNites/constants";

export const FloatingSoundParticles = memo(function FloatingSoundParticles() {
  const particles = [
    {
      emoji: "♪",
      top: "75%",
      right: "15%",
      color: CONCERT_COLORS.NEON_PINK,
      delay: "0s",
      duration: "12s",
      size: "text-4xl",
      opacity: 0.5,
    },
    {
      emoji: "♫",
      top: "60%",
      right: "20%",
      color: CONCERT_COLORS.NEON_PINK,
      delay: "2s",
      duration: "14s",
      size: "text-3xl",
      opacity: 0.4,
    },
    {
      emoji: "♪",
      top: "45%",
      right: "8%",
      color: CONCERT_COLORS.NEON_PINK,
      delay: "4s",
      duration: "10s",
      size: "text-5xl",
      opacity: 0.35,
    },
    {
      emoji: "♬",
      top: "80%",
      right: "25%",
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "1s",
      duration: "11s",
      size: "text-4xl",
      opacity: 0.45,
    },
    {
      emoji: "♪",
      top: "55%",
      right: "30%",
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "3s",
      duration: "13s",
      size: "text-3xl",
      opacity: 0.4,
    },
    {
      emoji: "♫",
      top: "35%",
      right: "18%",
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "5s",
      duration: "15s",
      size: "text-4xl",
      opacity: 0.3,
    },
    {
      emoji: "♪",
      top: "70%",
      right: "35%",
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "0.5s",
      duration: "12s",
      size: "text-3xl",
      opacity: 0.4,
    },
    {
      emoji: "♬",
      top: "50%",
      right: "40%",
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "2.5s",
      duration: "14s",
      size: "text-4xl",
      opacity: 0.35,
    },
    {
      emoji: "♫",
      top: "30%",
      right: "28%",
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "4.5s",
      duration: "11s",
      size: "text-3xl",
      opacity: 0.3,
    },
    {
      emoji: "♫",
      top: "65%",
      right: "50%",
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "1.5s",
      duration: "13s",
      size: "text-4xl",
      opacity: 0.4,
    },
    {
      emoji: "♪",
      top: "40%",
      right: "55%",
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "3.5s",
      duration: "12s",
      size: "text-3xl",
      opacity: 0.35,
    },
    {
      emoji: "♬",
      top: "25%",
      right: "45%",
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "5.5s",
      duration: "14s",
      size: "text-4xl",
      opacity: 0.3,
    },
    {
      emoji: "♪",
      top: "20%",
      right: "60%",
      color: CONCERT_COLORS.NEON_PINK,
      delay: "2s",
      duration: "15s",
      size: "text-3xl",
      opacity: 0.25,
    },
    {
      emoji: "♫",
      top: "15%",
      right: "70%",
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "4s",
      duration: "13s",
      size: "text-4xl",
      opacity: 0.2,
    },
    {
      emoji: "♬",
      top: "85%",
      right: "12%",
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "0s",
      duration: "10s",
      size: "text-5xl",
      opacity: 0.5,
    },
    {
      emoji: "✦",
      top: "68%",
      right: "22%",
      color: "#fff",
      delay: "1s",
      duration: "8s",
      size: "text-2xl",
      opacity: 0.5,
    },
    {
      emoji: "✧",
      top: "42%",
      right: "35%",
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "3s",
      duration: "9s",
      size: "text-xl",
      opacity: 0.4,
    },
    {
      emoji: "✦",
      top: "28%",
      right: "52%",
      color: CONCERT_COLORS.NEON_PINK,
      delay: "5s",
      duration: "10s",
      size: "text-2xl",
      opacity: 0.35,
    },
    {
      emoji: "✧",
      top: "58%",
      right: "48%",
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "2s",
      duration: "11s",
      size: "text-xl",
      opacity: 0.3,
    },
    {
      emoji: "✦",
      top: "18%",
      right: "38%",
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "4s",
      duration: "12s",
      size: "text-2xl",
      opacity: 0.25,
    },
  ];

  const orbs = [
    {
      top: "78%",
      right: "18%",
      size: 8,
      color: CONCERT_COLORS.NEON_PINK,
      delay: "0s",
      duration: "8s",
    },
    {
      top: "65%",
      right: "25%",
      size: 6,
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "1s",
      duration: "10s",
    },
    {
      top: "52%",
      right: "32%",
      size: 10,
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "2s",
      duration: "12s",
    },
    {
      top: "40%",
      right: "42%",
      size: 5,
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "3s",
      duration: "9s",
    },
    {
      top: "30%",
      right: "55%",
      size: 7,
      color: CONCERT_COLORS.NEON_PINK,
      delay: "4s",
      duration: "11s",
    },
    {
      top: "72%",
      right: "38%",
      size: 6,
      color: CONCERT_COLORS.NEON_GOLD,
      delay: "1.5s",
      duration: "10s",
    },
    {
      top: "48%",
      right: "20%",
      size: 8,
      color: CONCERT_COLORS.NEON_CYAN,
      delay: "2.5s",
      duration: "8s",
    },
    {
      top: "22%",
      right: "48%",
      size: 5,
      color: CONCERT_COLORS.NEON_PURPLE,
      delay: "3.5s",
      duration: "13s",
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size}`}
          style={{
            top: p.top,
            right: p.right,
            color: p.color,
            opacity: p.opacity,
            filter: `drop-shadow(0 0 15px ${p.color})`,
            animation: `soundParticleFloat ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {orbs.map((orb, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            top: orb.top,
            right: orb.right,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color}, transparent)`,
            boxShadow: `0 0 ${orb.size * 3}px ${orb.color}, 0 0 ${orb.size * 5}px ${orb.color}50`,
            animation: `soundOrbFloat ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
});
