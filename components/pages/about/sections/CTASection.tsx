"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  GlitchText,
  NeonText,
  InteractiveSpeaker,
  WaveformVisualizer,
} from "@/components/pages/about/decors";
import { useAnimationPolicy } from "@/hooks";

// ═══════════════════════════════════════════════════════════════════
// CTA SECTION - Concert themed
// ═══════════════════════════════════════════════════════════════════

const NEON = {
  CYAN: "#00FFFF",
  MAGENTA: "#FF00FF",
  LIME: "#39FF14",
  PINK: "#FF1493",
};

// Custom SVG Icons for buttons
const MicrophoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);

const TicketIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const SparkleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
);

// Static waveform bars for mobile
const StaticWaveform = ({ width = 200, height = 40 }: { width?: number; height?: number }) => {
  const bars = 24;
  const barWidth = (width - (bars - 1) * 2) / bars;
  const heights = [
    0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4,
    0.7, 0.5, 0.9, 0.6, 0.8,
  ];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="staticWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={NEON.CYAN} />
          <stop offset="50%" stopColor={NEON.MAGENTA} />
          <stop offset="100%" stopColor={NEON.LIME} />
        </linearGradient>
      </defs>
      {heights.map((h, i) => {
        const barHeight = h * height * 0.9;
        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 2}
            fill="url(#staticWaveGradient)"
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
};

export const CTASection = memo(function CTASection() {
  const { isMobile } = useAnimationPolicy();

  return (
    <section className="relative overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-32">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 sm:h-[600px] sm:w-[600px]"
        style={{
          background: `radial-gradient(circle, ${NEON.MAGENTA}40 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Speakers - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute -bottom-1 left-12 hidden opacity-50 lg:block">
            <InteractiveSpeaker size={250} side="left" />
          </div>
          <div className="absolute right-12 -bottom-1 hidden opacity-50 lg:block">
            <InteractiveSpeaker size={250} side="right" />
          </div>
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Main CTA content */}
        {isMobile ? (
          <h2
            className="mb-4 text-3xl font-black tracking-wider uppercase"
            style={{
              background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA}, ${NEON.LIME})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            JOIN THE WAVE
          </h2>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlitchText
              text="JOIN THE WAVE"
              className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            />
          </motion.div>
        )}

        {isMobile ? (
          <p className="mx-auto mb-6 max-w-sm text-base text-white/70">
            Experience <NeonText color="cyan">music</NeonText>,{" "}
            <NeonText color="magenta">art</NeonText>, and <NeonText color="lime">culture</NeonText>{" "}
            like never before.
          </p>
        ) : (
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-white/70 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Experience <NeonText color="cyan">music</NeonText>,{" "}
            <NeonText color="magenta">art</NeonText>, and <NeonText color="lime">culture</NeonText>{" "}
            like never before.
            <br />
            <span className="text-white/50">This is your moment.</span>
          </motion.p>
        )}

        {/* Waveform - static on mobile, animated on desktop */}
        {isMobile ? (
          <div className="mb-8 flex justify-center">
            <StaticWaveform width={200} height={40} />
          </div>
        ) : (
          <motion.div
            className="mb-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <WaveformVisualizer bars={32} width={280} height={50} color="gradient" />
          </motion.div>
        )}

        {/* CTA Buttons */}
        {isMobile ? (
          <div className="flex flex-col items-center gap-3">
            {/* Primary Button */}
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold tracking-wider uppercase"
              style={{
                background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                color: "#0a0014",
              }}
            >
              <MicrophoneIcon className="h-4 w-4" />
              <span>Explore Events</span>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/passes"
              className="flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-bold tracking-wider uppercase"
              style={{
                background: "transparent",
                border: `2px solid ${NEON.LIME}`,
                color: NEON.LIME,
              }}
            >
              <TicketIcon className="h-4 w-4" />
              <span>Get Passes</span>
            </Link>
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {/* Primary Button */}
            <Link href="/events" className="group relative">
              <div
                className="absolute -inset-1 rounded-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative flex items-center gap-3 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase sm:px-12 sm:text-base"
                style={{
                  background: `linear-gradient(90deg, ${NEON.CYAN}, ${NEON.MAGENTA})`,
                  color: "#0a0014",
                }}
              >
                <MicrophoneIcon />
                <span>Explore Events</span>
                <MicrophoneIcon />
              </div>
            </Link>

            {/* Secondary Button */}
            <Link href="/passes" className="group relative">
              <div
                className="absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: NEON.LIME,
                  filter: "blur(8px)",
                }}
              />
              <div
                className="relative flex items-center gap-3 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors duration-300 sm:px-12 sm:text-base"
                style={{
                  background: "transparent",
                  border: `2px solid ${NEON.LIME}`,
                  color: NEON.LIME,
                }}
              >
                <TicketIcon />
                <span>Get Passes</span>
                <TicketIcon />
              </div>
            </Link>
          </motion.div>
        )}

        {/* Bottom tagline */}
        {isMobile ? (
          <p
            className="mt-8 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase"
            style={{ color: `${NEON.CYAN}60` }}
          >
            <SparkleIcon className="h-3 w-3" />
            See you on the other side
            <SparkleIcon className="h-3 w-3" />
          </p>
        ) : (
          <motion.p
            className="mt-12 flex items-center justify-center gap-2 text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            style={{ color: `${NEON.CYAN}60` }}
          >
            <SparkleIcon />
            See you on the other side
            <SparkleIcon />
          </motion.p>
        )}
      </div>

      {/* Bottom neon border */}
      <div
        className="absolute right-0 bottom-0 left-0 h-[2px] sm:h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.CYAN}, ${NEON.MAGENTA}, ${NEON.LIME}, transparent)`,
          boxShadow: `0 0 20px ${NEON.MAGENTA}`,
        }}
      />
    </section>
  );
});
