"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COLORS, SHADOWS } from "@/components/pages/cart/constants/palette";

/**
 * Displayed when the cart has no items
 */
export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center px-4 py-16 text-center"
    >
      {/* Empty cart icon */}
      <div
        className="mb-8 flex h-32 w-32 items-center justify-center rounded-full"
        style={{
          background: `linear-gradient(135deg, rgba(212, 168, 83, 0.1), rgba(212, 168, 83, 0.05))`,
          border: `2px dashed ${COLORS.GOLD}40`,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.GOLD}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          <line x1="10" y1="10" x2="18" y2="10" />
        </svg>
      </div>

      {/* Heading */}
      <h2
        className="mb-3 text-2xl font-bold sm:text-3xl"
        style={{
          color: COLORS.GOLD,
          textShadow: `0 0 20px ${COLORS.GOLD}30`,
        }}
      >
        Your Cart is Empty
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md text-gray-400">
        Looks like you haven&apos;t added any passes yet. Explore our passes and grab yours for
        Kashi Yatra 2027!
      </p>

      {/* CTA button */}
      <Link
        href="/passes"
        className="inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold text-white transition-all hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
          boxShadow: SHADOWS.BUTTON,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        Browse Passes
      </Link>
    </motion.div>
  );
}
