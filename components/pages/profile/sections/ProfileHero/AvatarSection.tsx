"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { COLORS } from "@/components/pages/profile/constants/palette";
import { UserData, ProgressData, ProfileUser } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// AVATAR SECTION
// ═══════════════════════════════════════════════════════════════════
interface AvatarSectionProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
  initials: string;
}

export function AvatarSection({ userData, user, progress, initials }: AvatarSectionProps) {
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
