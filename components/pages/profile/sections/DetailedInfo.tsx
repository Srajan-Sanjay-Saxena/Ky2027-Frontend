"use client";

import {
  Mail,
  User,
  Shield,
  Calendar,
  Phone,
  GraduationCap,
  FileCheck,
  CheckCircle2,
  XCircle,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { COLORS } from "../constants/palette";
import { UserData, ProgressData, ProfileUser } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// DETAILED INFO SECTION
// Account information cards and verification status
// ═══════════════════════════════════════════════════════════════════

interface DetailedInfoProps {
  userData: UserData | null;
  user: ProfileUser;
  progress: ProgressData | null;
}

export function DetailedInfo({ userData, user, progress }: DetailedInfoProps) {
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Account Info Cards */}
      <div className="space-y-4 lg:col-span-2">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="flex shrink-0 items-center gap-3 text-lg font-semibold"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <User className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>Account Information</span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoCard
            icon={Mail}
            label="Email Address"
            value={userData?.email || user.email || null}
            isVerified
          />
          <InfoCard
            icon={Phone}
            label="Phone Number"
            value={userData?.phone || null}
            isVerified={progress?.steps.phone}
          />
          <InfoCard
            icon={GraduationCap}
            label="College"
            value={userData?.college || null}
            isVerified={progress?.steps.college}
          />
          <InfoCard
            icon={Shield}
            label="Aadhaar (Last 4)"
            value={userData?.aadhaarNumber ? `XXXX XXXX ${userData.aadhaarNumber.slice(-4)}` : null}
            isVerified={progress?.steps.aadhaarVerified}
          />
          <InfoCard
            icon={Calendar}
            label="Member Since"
            value={formatDate(userData?.joinedAt || null)}
          />
          <InfoCard icon={User} label="Gender" value={userData?.gender || null} />
        </div>
      </div>

      {/* Right Column - Verification Status */}
      <div className="space-y-4">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
          <h3
            className="flex shrink-0 items-center gap-3 text-lg font-semibold"
            style={{ color: COLORS.CREAM }}
          >
            <div
              className="rounded-lg p-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                border: `1px solid ${COLORS.GOLD}30`,
              }}
            >
              <FileCheck className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            </div>
            <span style={{ fontFamily: "var(--font-ethereal), serif" }}>Verification</span>
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
        </div>

        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
            border: `1px solid ${COLORS.GOLD}20`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
          }}
        >
          {/* Decorative corner accents */}
          <div
            className="absolute top-2 left-2 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute top-2 right-2 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute bottom-2 left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />
          <div
            className="absolute right-2 bottom-2 h-6 w-6 rounded-br-lg border-r-2 border-b-2 opacity-30"
            style={{ borderColor: COLORS.GOLD }}
          />

          <div className="relative space-y-3">
            <VerificationStep
              icon={Shield}
              label="Aadhaar Verified"
              isCompleted={progress?.steps.aadhaarVerified || false}
              description={
                progress?.steps.aadhaarVerified ? "Identity confirmed" : "Upload your Aadhaar"
              }
            />
            <VerificationStep
              icon={GraduationCap}
              label="College Details"
              isCompleted={progress?.steps.college || false}
              description={progress?.steps.college ? "Institution verified" : "Add your college"}
            />
            <VerificationStep
              icon={Phone}
              label="Phone Verified"
              isCompleted={progress?.steps.phone || false}
              description={progress?.steps.phone ? "Contact confirmed" : "Verify your number"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// INFO CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
function InfoCard({
  icon: Icon,
  label,
  value,
  isVerified,
}: {
  icon: LucideIcon;
  label: string;
  value: string | null;
  isVerified?: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="shrink-0 rounded-xl p-3.5 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
            border: `1px solid ${COLORS.GOLD}25`,
            boxShadow: `0 4px 15px ${COLORS.GOLD}10`,
          }}
        >
          <Icon className="h-5 w-5" color={COLORS.GOLD} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
            style={{ color: `${COLORS.GOLD}80` }}
          >
            {label}
            {isVerified && <BadgeCheck className="h-3.5 w-3.5" color={COLORS.SUCCESS} />}
          </p>
          <p
            className="truncate text-base font-medium"
            style={{ color: value ? COLORS.CREAM : `${COLORS.CREAM}40` }}
          >
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// VERIFICATION STEP ITEM
// ═══════════════════════════════════════════════════════════════════
function VerificationStep({
  icon: Icon,
  label,
  isCompleted,
  description,
}: {
  icon: LucideIcon;
  label: string;
  isCompleted: boolean;
  description: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-4 transition-all duration-300"
      style={{
        background: isCompleted ? `${COLORS.SUCCESS}08` : `${COLORS.ERROR}05`,
        border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}30` : `${COLORS.ERROR}20`}`,
      }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: isCompleted
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}20, ${COLORS.SUCCESS}10)`
            : `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
          border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}40` : `${COLORS.GOLD}25`}`,
        }}
      >
        <Icon className="h-5 w-5" color={isCompleted ? COLORS.SUCCESS : COLORS.GOLD} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className="font-semibold"
            style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.CREAM }}
          >
            {label}
          </p>
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4" color={COLORS.SUCCESS} />
          ) : (
            <XCircle className="h-4 w-4" color={COLORS.ERROR} />
          )}
        </div>
        <p className="text-sm" style={{ color: `${COLORS.CREAM}50` }}>
          {description}
        </p>
      </div>
    </div>
  );
}
