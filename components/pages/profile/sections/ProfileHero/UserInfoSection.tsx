"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserProfile, UserAccountProgress, ProfileUser } from "@/lib/api/helper/types";
import { AdminRoleBadge } from "./AdminRoleBadge";
import { CaBadge } from "./CaBadge";

// ═══════════════════════════════════════════════════════════════════
// USER INFO SECTION
// ═══════════════════════════════════════════════════════════════════
interface UserInfoSectionProps {
  userData: UserProfile | null;
  user: ProfileUser;
  progress: UserAccountProgress | null;
  isApprovedCa?: boolean;
}

export function UserInfoSection({ userData, user, progress, isApprovedCa }: UserInfoSectionProps) {
  const roleLevel = userData?.role?.level;
  const isAdmin = roleLevel && roleLevel !== "USER";

  return (
    <div className="flex-1 text-center lg:text-left">
      {/* Decorative Title Line */}
      <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a853]" />
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: `${COLORS.GOLD}80` }}>
          Yatri Profile
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a853]" />
      </div>

      <h1
        className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl"
        style={{
          background: `linear-gradient(135deg, ${COLORS.CREAM} 0%, ${COLORS.GOLD_LIGHT} 30%, ${COLORS.GOLD} 60%, ${COLORS.GOLD_LIGHT} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: `0 0 60px ${COLORS.GOLD}30`,
          fontFamily: "var(--font-ethereal), serif",
        }}
      >
        {userData?.firstName || user.name || "Traveler"}
      </h1>

      {/* Admin Role Badge - Only show for non-USER roles */}
      {isAdmin && (
        <div className="mb-6 flex justify-center lg:justify-start">
          <AdminRoleBadge role={roleLevel as "MASTER_ADMIN" | "MANAGER" | "OPERATOR"} />
        </div>
      )}

      {/* CA Badge - Only show for approved Campus Ambassadors */}
      {isApprovedCa && (
        <div className="mb-6 flex justify-center lg:justify-start">
          <CaBadge />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
        {/* Complete Profile Button - Royal CTA */}
        {!progress?.isProfileComplete && (
          <Link href="/complete-profile">
            <button
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 font-bold tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, #1a0a12 0%, #2d1520 50%, #1a0a12 100%)`,
                color: COLORS.GOLD,
                border: `2px solid ${COLORS.GOLD}60`,
                boxShadow: `
                  0 0 30px ${COLORS.GOLD}20,
                  0 8px 25px rgba(0,0,0,0.4),
                  inset 0 1px 0 ${COLORS.GOLD}20,
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `,
              }}
            >
              {/* Animated border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.GOLD}10, transparent, ${COLORS.GOLD}10)`,
                  boxShadow: `inset 0 0 20px ${COLORS.GOLD}15`,
                }}
              />

              <Sparkles
                className="relative h-5 w-5 transition-transform group-hover:rotate-12"
                style={{ color: COLORS.GOLD_LIGHT }}
              />
              <span
                className="relative text-base"
                style={{
                  textShadow: `0 0 20px ${COLORS.GOLD}50`,
                }}
              >
                Complete Your Profile
              </span>
              <ArrowRight
                className="relative h-5 w-5 transition-transform group-hover:translate-x-1"
                style={{ color: COLORS.GOLD_LIGHT }}
              />
            </button>
          </Link>
        )}

        {/* My Cart Button */}
        <Link href="/cart">
          <button
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl px-6 py-4 font-bold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}05)`,
              color: COLORS.GOLD,
              border: `2px solid ${COLORS.GOLD}40`,
              boxShadow: `0 0 20px ${COLORS.GOLD}10, 0 4px 15px rgba(0,0,0,0.3)`,
            }}
          >
            <ShoppingCart
              className="relative h-5 w-5 transition-transform group-hover:scale-110"
              style={{ color: COLORS.GOLD }}
            />
            <span className="relative text-sm" style={{ textShadow: `0 0 15px ${COLORS.GOLD}30` }}>
              My Cart
            </span>
            <ArrowRight
              className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
              style={{ color: COLORS.GOLD_LIGHT }}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
