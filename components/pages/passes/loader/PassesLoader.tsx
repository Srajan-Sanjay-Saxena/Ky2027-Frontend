"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/passes/constants/palette";

/**
 * Skeleton loader for a single pass card
 * Matches the dimensions and structure of PassCard
 */
export function PassCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative w-full max-w-[340px]"
    >
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Image skeleton */}
        <div className="relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[380px]">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `linear-gradient(135deg, rgba(212, 168, 83, 0.05) 0%, rgba(139, 69, 19, 0.08) 100%)`,
            }}
          />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(212, 168, 83, 0.08) 50%, transparent 100%)`,
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 p-5">
          {/* Name skeleton */}
          <div className="flex items-center justify-between">
            <div
              className="h-7 w-32 animate-pulse rounded-md"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <div
              className="h-6 w-16 animate-pulse rounded-full"
              style={{ background: "rgba(212, 168, 83, 0.15)" }}
            />
          </div>

          {/* Tagline skeleton */}
          <div
            className="h-4 w-40 animate-pulse rounded"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Benefits skeleton */}
          <div className="space-y-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-4 w-4 animate-pulse rounded-full"
                  style={{
                    background: "rgba(212, 168, 83, 0.2)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div
                  className="h-3 animate-pulse rounded"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    width: `${60 + Math.random() * 30}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Button skeleton */}
          <div
            className="mt-4 h-12 w-full animate-pulse rounded-xl"
            style={{
              background: `linear-gradient(135deg, rgba(212, 168, 83, 0.15) 0%, rgba(139, 69, 19, 0.2) 100%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Grid of skeleton loaders for the passes section
 */
export function PassesLoader() {
  return (
    <div className="grid grid-cols-1 items-end justify-items-center gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
      {[0, 1, 2].map((index) => (
        <PassCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}

/**
 * Error state component for passes
 */
export function PassesError({ onRetry }: { onRetry?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Decorative container */}
      <div
        className="relative rounded-2xl px-12 py-10"
        style={{
          background: `linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 168, 83, 0.05) 50%, rgba(139, 69, 19, 0.1) 100%)`,
          border: `1px solid rgba(212, 168, 83, 0.2)`,
          boxShadow: `0 0 40px rgba(212, 168, 83, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.3)`,
        }}
      >
        {/* Corner decorations */}
        <div
          className="absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-2 border-l-2"
          style={{ borderColor: `${COLORS.GOLD}50` }}
        />
        <div
          className="absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-2 border-r-2"
          style={{ borderColor: `${COLORS.GOLD}50` }}
        />
        <div
          className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-2 border-l-2"
          style={{ borderColor: `${COLORS.GOLD}50` }}
        />
        <div
          className="absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-2 border-b-2"
          style={{ borderColor: `${COLORS.GOLD}50` }}
        />

        {/* Icon with glow */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 opacity-50 blur-xl"
            style={{ background: `radial-gradient(circle, ${COLORS.GOLD}40 0%, transparent 70%)` }}
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative text-6xl"
          >
            🎭
          </motion.div>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-xl font-semibold tracking-wide"
          style={{
            color: COLORS.GOLD,
            textShadow: `0 0 20px ${COLORS.GOLD}40`,
          }}
        >
          Unable to Load Passes
        </h3>

        {/* Description */}
        <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-400">
          We couldn&apos;t fetch the festival passes. Please check your internet connection and try
          again.
        </p>

        {/* Retry button */}
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="group relative overflow-hidden rounded-xl px-8 py-3 text-sm font-semibold tracking-wide transition-all"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}30, ${COLORS.GOLD}15)`,
              border: `1px solid ${COLORS.GOLD}60`,
              color: COLORS.GOLD,
              boxShadow: `0 4px 20px ${COLORS.GOLD}20`,
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}20, transparent)`,
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
