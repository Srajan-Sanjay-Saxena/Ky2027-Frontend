"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { NavbarDesign as Navbar } from "@/components/navbar/Design";
import { ProfileLoader } from "@/components/loader";
import { useMyAccount } from "@/lib/api/hooks";
import { useSignOut } from "@/lib/api/hooks";
import { IMAGES } from "@/lib/images";
import {
  LogOut,
  Mail,
  User,
  Shield,
  Calendar,
  Phone,
  GraduationCap,
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const COLORS = {
  BG_DEEP: "#0a0612",
  BG_ROYAL: "#1a0a20",
  BG_WINE: "#2a1020",
  GOLD: "#d4a853",
  GOLD_LIGHT: "#f0d890",
  GOLD_DARK: "#8b6914",
  GOLD_SHIMMER: "#ffd700",
  CREAM: "#fdf6e3",
  SUCCESS: "#22c55e",
  ERROR: "#ef4444",
  WARNING: "#f59e0b",
  MAROON: "#5c1a1a",
  PURPLE_DEEP: "#2d1b4e",
};

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════
interface ProfilePageContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

// ═══════════════════════════════════════════════════════════════════
// PROGRESS RING COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ProgressRing({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={`${COLORS.GOLD}20`}
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={percentage === 100 ? COLORS.SUCCESS : COLORS.GOLD}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-2xl font-bold"
          style={{ color: percentage === 100 ? COLORS.SUCCESS : COLORS.GOLD }}
        >
          {percentage}%
        </span>
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
  icon: React.ElementType;
  label: string;
  isCompleted: boolean;
  description: string;
}) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
      style={{
        background: isCompleted ? `${COLORS.SUCCESS}08` : `${COLORS.ERROR}05`,
        border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}30` : `${COLORS.ERROR}20`}`,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: isCompleted
            ? `linear-gradient(135deg, ${COLORS.SUCCESS}20, ${COLORS.SUCCESS}10)`
            : `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
          border: `1px solid ${isCompleted ? `${COLORS.SUCCESS}40` : `${COLORS.GOLD}25`}`,
        }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.GOLD }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="font-semibold"
            style={{ color: isCompleted ? COLORS.SUCCESS : COLORS.CREAM }}
          >
            {label}
          </p>
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4" style={{ color: COLORS.SUCCESS }} />
          ) : (
            <XCircle className="h-4 w-4" style={{ color: COLORS.ERROR }} />
          )}
        </div>
        <p className="text-sm" style={{ color: `${COLORS.CREAM}50` }}>
          {description}
        </p>
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
  icon: React.ElementType;
  label: string;
  value: string | null;
  isVerified?: boolean;
}) {
  return (
    <div
      className="relative rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-xl group overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
        border: `1px solid ${COLORS.GOLD}20`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${COLORS.GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="p-3.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.GOLD}08)`,
            border: `1px solid ${COLORS.GOLD}25`,
            boxShadow: `0 4px 15px ${COLORS.GOLD}10`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: COLORS.GOLD }} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-xs uppercase tracking-wider mb-1.5 flex items-center gap-2 font-semibold"
            style={{ color: `${COLORS.GOLD}80` }}
          >
            {label}
            {isVerified && (
              <BadgeCheck className="h-3.5 w-3.5" style={{ color: COLORS.SUCCESS }} />
            )}
          </p>
          <p
            className="text-base font-medium truncate"
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
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function ProfilePageContent({ user }: ProfilePageContentProps) {
  const { data: session } = useSession();
  const { isSigningOut, handleSignOut } = useSignOut();
  
  // Fetch account data via GraphQL - returns profile + progress
  const {
    profile: userData,
    progress,
    isLoading,
    isError,
  } = useMyAccount();

  const initials =
    (userData?.firstName || user.name)
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <Navbar position="relative" topOffset={18} />
      </div>

      <main
        className="min-h-screen pt-28 sm:pt-32 pb-12 px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <ProfileLoader />
          ) : isError ? (
            /* Error State - Centered */
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div
                className="rounded-3xl p-10 sm:p-14 text-center max-w-md mx-auto"
                style={{
                  background: `linear-gradient(145deg, ${COLORS.BG_WINE}60 0%, ${COLORS.BG_ROYAL}80 100%)`,
                  border: `1px solid ${COLORS.ERROR}25`,
                  boxShadow: `0 0 60px ${COLORS.ERROR}10, 0 20px 40px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Animated Icon */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.ERROR}20, ${COLORS.ERROR}10)`,
                    border: `2px solid ${COLORS.ERROR}40`,
                    boxShadow: `0 0 30px ${COLORS.ERROR}20`,
                  }}
                >
                  <AlertTriangle 
                    className="h-10 w-10" 
                    style={{ color: COLORS.ERROR }} 
                  />
                </div>

                <h2 
                  className="text-2xl sm:text-3xl font-bold mb-3" 
                  style={{ color: COLORS.CREAM }}
                >
                  Failed to load profile
                </h2>
                <p 
                  className="mb-8 text-base" 
                  style={{ color: `${COLORS.CREAM}60` }}
                >
                  We couldn&apos;t fetch your profile data. This might be a temporary issue.
                </p>

                {/* Retry Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD} 0%, ${COLORS.GOLD_DARK} 100%)`,
                    color: COLORS.BG_DEEP,
                    boxShadow: `0 10px 30px ${COLORS.GOLD}30`,
                  }}
                >
                  <Loader2 className="h-5 w-5" />
                  Try Again
                </button>

                {/* Help text */}
                <p 
                  className="mt-6 text-xs" 
                  style={{ color: `${COLORS.CREAM}40` }}
                >
                  If the problem persists, please contact support.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Main Profile Card */}
              <div
                className="relative rounded-3xl overflow-hidden mb-8"
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
                <div className="absolute top-6 right-16 w-10 h-10 opacity-40 animate-pulse">
                  <Image
                    src={IMAGES.contact.floatingDiya}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="relative px-8 sm:px-12 py-12">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center">
                      {/* Royal Frame for Avatar */}
                      <div className="relative">
                        {/* Progress Ring around avatar (when incomplete) */}
                        {progress && !progress.isProfileComplete && (
                          <div className="absolute -inset-6">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              {/* Background circle */}
                              <circle
                                cx="50"
                                cy="50"
                                r="47"
                                fill="none"
                                stroke={`${COLORS.GOLD}15`}
                                strokeWidth="4"
                              />
                              {/* Progress circle */}
                              <circle
                                cx="50"
                                cy="50"
                                r="47"
                                fill="none"
                                stroke={COLORS.GOLD}
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 47}
                                strokeDashoffset={2 * Math.PI * 47 - (progress.completionPercentage / 100) * 2 * Math.PI * 47}
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
                            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden flex items-center justify-center ring-4 ring-[#0a0612]"
                            style={{
                              background: userData?.avatarUrl || user.image
                                ? COLORS.BG_DEEP
                                : `linear-gradient(135deg, ${COLORS.BG_ROYAL} 0%, ${COLORS.BG_WINE} 100%)`,
                            }}
                          >
                            {userData?.avatarUrl || user.image ? (
                              <Image
                                src={userData?.avatarUrl || user.image || ""}
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
                            className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
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
                            className="absolute -bottom-2 -right-2 w-11 h-11 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${COLORS.BG_DEEP}, ${COLORS.BG_ROYAL})`,
                              border: `2px solid ${COLORS.GOLD}`,
                              boxShadow: `0 0 15px ${COLORS.GOLD}40`,
                            }}
                          >
                            <span 
                              className="text-xs font-bold"
                              style={{ color: COLORS.GOLD }}
                            >
                              {progress.completionPercentage}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Royal Status Badge */}
                      <div
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                        style={{
                          background: progress?.isProfileComplete
                            ? `linear-gradient(135deg, ${COLORS.SUCCESS}15, ${COLORS.SUCCESS}08)`
                            : `linear-gradient(135deg, ${COLORS.WARNING}15, ${COLORS.WARNING}08)`,
                          border: `1px solid ${progress?.isProfileComplete ? `${COLORS.SUCCESS}40` : `${COLORS.WARNING}40`}`,
                          boxShadow: `0 2px 15px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}15`,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{
                            background: progress?.isProfileComplete
                              ? COLORS.SUCCESS
                              : COLORS.WARNING,
                            boxShadow: `0 0 8px ${progress?.isProfileComplete ? COLORS.SUCCESS : COLORS.WARNING}`,
                          }}
                        />
                        <span
                          className="text-sm font-medium tracking-wide"
                          style={{
                            color: progress?.isProfileComplete
                              ? COLORS.SUCCESS
                              : COLORS.WARNING,
                          }}
                        >
                          {progress?.isProfileComplete 
                            ? "Verified Pilgrim" 
                            : "Profile Incomplete"}
                        </span>
                      </div>

                      {/* Pending steps chips (when incomplete) */}
                      {progress && !progress.isProfileComplete && (
                        <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-[200px]">
                          {!progress.steps.aadhaar && (
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
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
                              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
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
                              className="px-2.5 py-1 rounded-full text-[10px] font-medium"
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

                    {/* User Info Section */}
                    <div className="flex-1 text-center lg:text-left">
                      {/* Decorative Title Line */}
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4a853]" />
                        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: `${COLORS.GOLD}80` }}>
                          Yatri Profile
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4a853]" />
                      </div>

                      <h1
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6"
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

                      {/* Ornate Quick Info Pills - Phone & College only */}
                      {(userData?.phone || userData?.college) && (
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                          {userData?.phone && (
                            <div
                              className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                              style={{
                                background: `linear-gradient(135deg, ${COLORS.BG_DEEP}80, ${COLORS.BG_ROYAL}60)`,
                                border: `1px solid ${COLORS.GOLD}25`,
                                boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${COLORS.GOLD}10`,
                              }}
                            >
                              <Phone className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                              <span className="text-sm font-medium" style={{ color: COLORS.CREAM }}>
                                {userData.phone}
                              </span>
                              {progress?.steps.phone && (
                                <BadgeCheck className="h-4 w-4" style={{ color: COLORS.SUCCESS }} />
                              )}
                            </div>
                          )}

                          {userData?.college && (
                            <div
                              className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                              style={{
                                background: `linear-gradient(135deg, ${COLORS.BG_DEEP}80, ${COLORS.BG_ROYAL}60)`,
                                border: `1px solid ${COLORS.GOLD}25`,
                                boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${COLORS.GOLD}10`,
                              }}
                            >
                              <GraduationCap className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                              <span
                                className="text-sm font-medium max-w-[200px] truncate"
                                style={{ color: COLORS.CREAM }}
                              >
                                {userData.college}
                              </span>
                              {progress?.steps.college && (
                                <BadgeCheck className="h-4 w-4" style={{ color: COLORS.SUCCESS }} />
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Complete Profile Button - Royal CTA */}
                      {(!progress?.isProfileComplete) && (
                        <div className="flex justify-center lg:justify-start">
                          <Link href="/complete-profile">
                            <button
                              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 hover:scale-105 overflow-hidden"
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
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                  background: `linear-gradient(135deg, ${COLORS.GOLD}10, transparent, ${COLORS.GOLD}10)`,
                                  boxShadow: `inset 0 0 20px ${COLORS.GOLD}15`,
                                }}
                              />
                              
                              <Sparkles 
                                className="h-5 w-5 relative transition-transform group-hover:rotate-12" 
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
                                className="h-5 w-5 relative group-hover:translate-x-1 transition-transform" 
                                style={{ color: COLORS.GOLD_LIGHT }}
                              />
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
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

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Left Column - Account Info Cards */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
                    <h3
                      className="text-lg font-semibold flex items-center gap-3 shrink-0"
                      style={{ color: COLORS.CREAM }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                          border: `1px solid ${COLORS.GOLD}30`,
                        }}
                      >
                        <User className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-ethereal), serif" }}>
                        Account Information
                      </span>
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={userData?.aadhaarLast4 ? `XXXX XXXX ${userData.aadhaarLast4}` : null}
                      isVerified={progress?.steps.aadhaar}
                    />
                    <InfoCard
                      icon={Calendar}
                      label="Member Since"
                      value={formatDate(userData?.createdAt || null)}
                    />
                    <InfoCard
                      icon={User}
                      label="Gender"
                      value={userData?.gender || null}
                    />
                  </div>
                </div>

                {/* Right Column - Verification Status */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
                    <h3
                      className="text-lg font-semibold flex items-center gap-3 shrink-0"
                      style={{ color: COLORS.CREAM }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.GOLD}10)`,
                          border: `1px solid ${COLORS.GOLD}30`,
                        }}
                      >
                        <FileCheck className="h-4 w-4" style={{ color: COLORS.GOLD }} />
                      </div>
                      <span style={{ fontFamily: "var(--font-ethereal), serif" }}>
                        Verification
                      </span>
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4a853]/40 to-[#d4a853]/20" />
                  </div>

                  <div
                    className="relative rounded-2xl p-6 overflow-hidden"
                    style={{
                      background: `linear-gradient(145deg, ${COLORS.BG_ROYAL}95 0%, ${COLORS.BG_WINE}80 100%)`,
                      border: `1px solid ${COLORS.GOLD}20`,
                      boxShadow: `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 ${COLORS.GOLD}10`,
                    }}
                  >
                    {/* Decorative corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 rounded-tl-lg opacity-30" style={{ borderColor: COLORS.GOLD }} />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 rounded-tr-lg opacity-30" style={{ borderColor: COLORS.GOLD }} />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 rounded-bl-lg opacity-30" style={{ borderColor: COLORS.GOLD }} />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 rounded-br-lg opacity-30" style={{ borderColor: COLORS.GOLD }} />

                    <div className="relative space-y-3">
                      <VerificationStep
                        icon={Shield}
                        label="Aadhaar Verified"
                        isCompleted={progress?.steps.aadhaar || false}
                        description={
                          progress?.steps.aadhaar
                            ? "Identity confirmed"
                            : "Upload your Aadhaar"
                        }
                      />
                      <VerificationStep
                        icon={GraduationCap}
                        label="College Details"
                        isCompleted={progress?.steps.college || false}
                        description={
                          progress?.steps.college
                            ? "Institution verified"
                            : "Add your college"
                        }
                      />
                      <VerificationStep
                        icon={Phone}
                        label="Phone Verified"
                        isCompleted={progress?.steps.phone || false}
                        description={
                          progress?.steps.phone
                            ? "Contact confirmed"
                            : "Verify your number"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="group relative flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.ERROR}10 0%, ${COLORS.MAROON}30 100%)`,
                    border: `1px solid ${COLORS.ERROR}30`,
                    color: "#fca5a5",
                    boxShadow: `0 4px 20px ${COLORS.ERROR}10`,
                  }}
                >
                  {/* Hover glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${COLORS.ERROR}15 0%, transparent 70%)`,
                    }}
                  />
                  
                  <span className="relative flex items-center gap-3">
                    {isSigningOut ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    )}
                    <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                  </span>
                </button>
              </div>
            </>
          )}

          {/* Royal Footer */}
          <div className="mt-16 flex flex-col items-center">
            {/* Ornate divider */}
            <div className="flex items-center justify-center gap-4 w-full max-w-md">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}50)` }}
              />
              <div className="flex items-center gap-3">
                <span className="text-lg opacity-60">✦</span>
                <div className="w-7 h-7 relative">
                  <Image
                    src={IMAGES.contact.floatingDiya}
                    alt=""
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg opacity-60">✦</span>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(90deg, ${COLORS.GOLD}50, transparent)` }}
              />
            </div>
            
            {/* Sanskrit blessing */}
            <p
              className="text-center text-sm mt-4 italic"
              style={{ color: `${COLORS.GOLD}50` }}
            >
              ॐ असतो मा सद्गमय
            </p>
            
            <p
              className="text-center text-xs mt-2 tracking-[0.2em] uppercase"
              style={{ color: `${COLORS.GOLD}40` }}
            >
              Kashi Yatra 2027 • IIT BHU Varanasi
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
