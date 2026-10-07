"use client";

import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { ArrowRight, Sparkles, BadgeCheck, Shield, Crown, Star } from "lucide-react";
import { COLORS } from "../constants/palette";
import { UserData, ProgressData, ProfileUser } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE HERO SECTION
// Main profile card with avatar, name, and quick actions
// ═══════════════════════════════════════════════════════════════════

interface ProfileHeroProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
}

export function ProfileHero({ userData, user, progress }: ProfileHeroProps) {
  const initials =
    (userData?.firstName || user.name)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div
      className="relative mb-8 overflow-hidden rounded-3xl"
      style={{
        background: `linear-gradient(135deg, ${COLORS.BG_WINE}80 0%, ${COLORS.BG_ROYAL}90 50%, ${COLORS.BG_WINE}80 100%)`,
        border: `2px solid ${COLORS.GOLD}30`,
        boxShadow: `
          0 0 80px ${COLORS.GOLD}10, 
          0 0 120px ${COLORS.GOLD}05,
          0 25px 50px rgba(0,0,0,0.4),
          inset 0 1px 0 ${COLORS.GOLD}20
        `,
      }}
    >
      {/* Ornate Top Border */}
      <div className="relative h-2 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: progress?.isProfileComplete
              ? `linear-gradient(90deg, transparent, ${COLORS.SUCCESS}60, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}60, transparent)`
              : `linear-gradient(90deg, transparent, ${COLORS.GOLD_DARK}, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, transparent)`,
          }}
        />
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.GOLD_SHIMMER}80 50%, transparent 100%)`,
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Mandala Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23d4a853' stroke-width='0.5' fill='none'/%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50' stroke='%23d4a853' stroke-width='0.3'/%3E%3Cpath d='M50 10 L90 50 L50 90 L10 50 Z' stroke='%23d4a853' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating Diya Decoration */}
      <div className="absolute top-6 right-16 h-10 w-10 animate-pulse opacity-40">
        <Image
          src={IMAGES.contact.floatingDiya}
          alt=""
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="relative px-8 py-12 sm:px-12">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
          {/* Avatar Section */}
          <AvatarSection userData={userData} user={user} progress={progress} initials={initials} />

          {/* User Info Section */}
          <UserInfoSection userData={userData} user={user} progress={progress} />
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40, ${COLORS.GOLD}60, ${COLORS.GOLD}40, transparent)`,
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// AVATAR SECTION
// ═══════════════════════════════════════════════════════════════════
function AvatarSection({
  userData,
  user,
  progress,
  initials,
}: ProfileHeroProps & { initials: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Royal Frame for Avatar */}
      <div className="relative">
        {/* Progress Ring around avatar (when incomplete) */}
        {progress && !progress.isProfileComplete && (
          <div className="absolute -inset-6">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={`${COLORS.GOLD}15`}
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke={COLORS.GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 47}
                strokeDashoffset={
                  2 * Math.PI * 47 - (progress.completionPercentage / 100) * 2 * Math.PI * 47
                }
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${COLORS.GOLD}60)`,
                }}
              />
            </svg>
          </div>
        )}

        {/* Decorative rotating ring (when complete) */}
        {progress?.isProfileComplete && (
          <div
            className="absolute -inset-3 rounded-full opacity-30"
            style={{
              background: `conic-gradient(from 0deg, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}80, ${COLORS.SUCCESS})`,
              animation: "spin 20s linear infinite",
            }}
          />
        )}

        {/* Glowing aura */}
        <div
          className="absolute -inset-2 rounded-full blur-lg"
          style={{
            background: progress?.isProfileComplete
              ? `radial-gradient(circle, ${COLORS.SUCCESS}30 0%, transparent 70%)`
              : `radial-gradient(circle, ${COLORS.GOLD}25 0%, transparent 70%)`,
          }}
        />

        {/* Main avatar container */}
        <div
          className="relative rounded-full p-[3px]"
          style={{
            background: progress?.isProfileComplete
              ? `linear-gradient(135deg, ${COLORS.SUCCESS}, ${COLORS.SUCCESS}80, ${COLORS.SUCCESS})`
              : `linear-gradient(135deg, ${COLORS.GOLD_LIGHT}, ${COLORS.GOLD}, ${COLORS.GOLD_DARK}, ${COLORS.GOLD}, ${COLORS.GOLD_LIGHT})`,
            boxShadow: `
              0 0 30px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.GOLD}30,
              0 0 60px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.GOLD}15
            `,
          }}
        >
          <div
            className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full ring-4 ring-[#0a0612] sm:h-32 sm:w-32"
            style={{
              background:
                userData?.candidatePhotoUrl || userData?.googleAvatarUrl || user.image
                  ? COLORS.BG_DEEP
                  : `linear-gradient(135deg, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_WINE} 100%)`,
            }}
          >
            {userData?.candidatePhotoUrl || userData?.googleAvatarUrl || user.image ? (
              <Image
                src={userData?.candidatePhotoUrl || userData?.googleAvatarUrl || user.image || ""}
                alt={userData?.firstName || user.name || "User"}
                width={128}
                height={128}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span
                className="text-4xl font-bold"
                style={{
                  color: COLORS.GOLD,
                  textShadow: `0 0 15px ${COLORS.GOLD}40`,
                }}
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Verified badge with glow */}
        {progress?.isProfileComplete && (
          <div
            className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.SUCCESS}, #16a34a)`,
              boxShadow: `0 0 20px ${COLORS.SUCCESS}50`,
            }}
          >
            <BadgeCheck className="h-5 w-5 text-white" />
          </div>
        )}

        {/* Percentage badge (when incomplete) */}
        {progress && !progress.isProfileComplete && (
          <div
            className="absolute -right-2 -bottom-2 flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${COLORS.BG_DEEP}, ${COLORS.BG_ROYAL})`,
              border: `2px solid ${COLORS.GOLD}`,
              boxShadow: `0 0 15px ${COLORS.GOLD}40`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: COLORS.GOLD }}>
              {progress.completionPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Royal Status Badge */}
      <div
        className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5"
        style={{
          background: progress?.isProfileComplete
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}15, ${COLORS.SUCCESS}08)`
            : `linear-gradient(135deg, ${COLORS.WARNING}15, ${COLORS.WARNING}08)`,
          border: `1px solid ${progress?.isProfileComplete ? `${COLORS.SUCCESS}40` : `${COLORS.WARNING}40`}`,
          boxShadow: `0 2px 15px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}15`,
        }}
      >
        <div
          className="h-2 w-2 animate-pulse rounded-full"
          style={{
            background: progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING,
            boxShadow: `0 0 8px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}`,
          }}
        />
        <span
          className="text-sm font-medium tracking-wide"
          style={{
            color: progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING,
          }}
        >
          {progress?.isProfileComplete ? "Verified Pilgrim" : "Profile Incomplete"}
        </span>
      </div>

      {/* Pending steps chips (when incomplete) */}
      {progress && !progress.isProfileComplete && (
        <div className="mt-3 flex max-w-[200px] flex-wrap justify-center gap-1.5">
          {!progress.steps.aadhaarVerified && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              Aadhaar
            </span>
          )}
          {!progress.steps.college && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              College
            </span>
          )}
          {!progress.steps.phone && (
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{
                background: `${COLORS.ERROR}15`,
                color: `${COLORS.ERROR}cc`,
                border: `1px solid ${COLORS.ERROR}25`,
              }}
            >
              Phone
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ADMIN ROLE BADGE
// Shows special badge for MASTER_ADMIN, MANAGER, OPERATOR roles
// ═══════════════════════════════════════════════════════════════════
const ROLE_CONFIG = {
  MASTER_ADMIN: {
    label: "Master Admin",
    icon: Crown,
    gradient: "linear-gradient(135deg, #ffd700, #ff8c00)",
    bgGradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))",
    borderColor: "rgba(255, 215, 0, 0.5)",
    glowColor: "rgba(255, 215, 0, 0.3)",
  },
  MANAGER: {
    label: "Manager",
    icon: Shield,
    gradient: "linear-gradient(135deg, #a855f7, #6366f1)",
    bgGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(99, 102, 241, 0.1))",
    borderColor: "rgba(168, 85, 247, 0.5)",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  OPERATOR: {
    label: "Operator",
    icon: Star,
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
    bgGradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(20, 184, 166, 0.1))",
    borderColor: "rgba(34, 197, 94, 0.5)",
    glowColor: "rgba(34, 197, 94, 0.3)",
  },
} as const;

function AdminRoleBadge({ role }: { role: "MASTER_ADMIN" | "MANAGER" | "OPERATOR" }) {
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wide"
      style={{
        background: config.bgGradient,
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 0 20px ${config.glowColor}, 0 4px 15px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: config.gradient }}
      >
        <Icon className="h-3.5 w-3.5 text-white" />
      </div>
      <span
        style={{
          background: config.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {config.label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// USER INFO SECTION
// ═══════════════════════════════════════════════════════════════════
function UserInfoSection({ userData, user, progress }: ProfileHeroProps) {
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
