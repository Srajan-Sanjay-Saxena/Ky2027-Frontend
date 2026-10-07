"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COLORS } from "@/components/pages/passes/constants/palette";

interface ProfileIncompleteToastProps {
  onClose?: () => void;
}

/**
 * Info toast shown when user tries to checkout without completing profile verification
 */
export function ProfileIncompleteToast({ onClose }: ProfileIncompleteToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="relative overflow-hidden rounded-xl p-4"
      style={{
        background: `linear-gradient(135deg, rgba(30, 20, 40, 0.98) 0%, rgba(45, 25, 55, 0.98) 100%)`,
        border: `1px solid rgba(212, 168, 83, 0.4)`,
        boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 168, 83, 0.15)`,
        maxWidth: "360px",
      }}
    >
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            background: `linear-gradient(135deg, rgba(212, 168, 83, 0.2), rgba(139, 69, 19, 0.2))`,
            border: `1px solid rgba(212, 168, 83, 0.3)`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: COLORS.GOLD }}>
            Profile Verification Required
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-gray-300">
            Please complete your profile verification to proceed with the checkout. This includes
            phone verification, college details, and Aadhaar verification.
          </p>

          {/* Action button */}
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}25, ${COLORS.GOLD}15)`,
              border: `1px solid ${COLORS.GOLD}50`,
              color: COLORS.GOLD,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Complete Profile
          </Link>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}
