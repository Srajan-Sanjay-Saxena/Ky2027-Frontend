"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserData, ProgressData, ProfileUser } from "@/lib/api/helper/types";
import { AdminRoleBadge } from "./AdminRoleBadge";

// ═══════════════════════════════════════════════════════════════════
// USER INFO SECTION
// ═══════════════════════════════════════════════════════════════════
interface UserInfoSectionProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
}

export function UserInfoSection({ userData, user, progress }: UserInfoSectionProps) {
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

      {/* Complete Profile Button - Royal CTA */}
      {!progress?.isProfileComplete && (
        <div className="flex justify-center lg:justify-start">
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
        </div>
      )}
    </div>
  );
}
