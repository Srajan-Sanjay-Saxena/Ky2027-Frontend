"use client";

import { ROYAL_COLORS } from "./constants";

export function BackgroundEffects() {
  return (
    <>
      {/* Background decorative pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23FFD700' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="fixed top-[20%] left-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ROYAL_COLORS.HOT_PINK}15 0%, transparent 60%)`,
          filter: "blur(60px)",
          animation: "pulseSlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="fixed bottom-[20%] right-[10%] w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${ROYAL_COLORS.GOLD}10 0%, transparent 60%)`,
          filter: "blur(80px)",
          animation: "pulseSlow 8s ease-in-out infinite 2s",
        }}
      />
    </>
  );
}
