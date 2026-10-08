"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface ProfileIncompleteCardProps {
  completionPercentage: number;
  displayName?: string | null;
}

/**
 * Card shown when user's profile is incomplete
 * Displays progress and link to complete profile
 */
export function ProfileIncompleteCard({
  completionPercentage,
  displayName,
}: ProfileIncompleteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg overflow-hidden rounded-2xl"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid rgba(245, 158, 11, 0.3)`,
        boxShadow: SHADOWS.CARD,
      }}
    >
      {/* Warning accent line at top */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.WARNING}, transparent)`,
        }}
      />

      <div className="p-6 sm:p-8">
        {/* Icon and heading */}
        <div className="mb-6 flex items-start gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.WARNING}20, ${COLORS.WARNING}10)`,
              border: `1px solid ${COLORS.WARNING}40`,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.WARNING}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
          </div>

          <div>
            <h2 className="mb-1 text-xl font-bold text-white">
              {displayName ? `Hi ${displayName.split(" ")[0]}!` : "Complete Your Profile"}
            </h2>
            <p className="text-sm text-gray-400">
              Please complete your profile to add items to your cart.
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">Profile Completion</span>
            <span style={{ color: COLORS.WARNING }} className="font-semibold">
              {completionPercentage}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${COLORS.WARNING}, ${COLORS.GOLD})`,
              }}
            />
          </div>
        </div>

        {/* Steps needed */}
        <div className="mb-6 rounded-lg bg-black/30 p-4">
          <p className="mb-3 text-sm font-medium text-gray-300">Steps to complete:</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
              Phone number verification
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
              College details
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
              Aadhaar verification (upload & verify)
            </li>
          </ul>
        </div>

        {/* Action button */}
        <Link
          href="/complete-profile"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${COLORS.WARNING}, ${COLORS.GOLD})`,
            boxShadow: SHADOWS.BUTTON,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Complete Your Profile
        </Link>
      </div>
    </motion.div>
  );
}
