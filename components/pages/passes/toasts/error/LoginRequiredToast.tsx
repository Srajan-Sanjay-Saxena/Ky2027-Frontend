"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COLORS } from "@/components/pages/passes/constants/palette";

/**
 * Toast shown when user is not logged in
 */
export function LoginRequiredToast({ onClose }: { onClose?: () => void }) {
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
        maxWidth: "320px",
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
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h4 className="mb-1 text-sm font-semibold" style={{ color: COLORS.GOLD }}>
            Login Required
          </h4>
          <p className="mb-3 text-xs leading-relaxed text-gray-300">
            Please login to your account to purchase festival passes.
          </p>

          {/* Action button */}
          <Link
            href="/login"
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
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login Now
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
