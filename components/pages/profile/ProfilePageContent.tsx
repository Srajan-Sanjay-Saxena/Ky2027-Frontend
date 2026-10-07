"use client";

import { LightNavbar } from "@/components/navbar/Navbar";
import { ProfileLoader } from "./loader";
import { useFullAccount, useSignOut } from "@/lib/api/hooks";
import { ProfileHero, DetailedInfo, ProfileFooter } from "./sections";
import { ErrorState } from "./error";
import { COLORS } from "./constants/palette";
import { ProfileUser } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// PROFILE PAGE CONTENT
// Main container that composes all profile sections
// ═══════════════════════════════════════════════════════════════════

interface ProfilePageContentProps {
  user: ProfileUser;
}

export function ProfilePageContent({ user }: ProfilePageContentProps) {
  const { isSigningOut, handleSignOut } = useSignOut();

  // Fetch account data via GraphQL - returns profile + progress
  const { profile: userData, progress, isLoading, isError } = useFullAccount();

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed inset-x-0 top-0 z-[200]">
        <LightNavbar position="relative" topOffset={18} theme="main" />
      </div>

      <main
        className="min-h-screen px-4 pt-28 pb-12 sm:pt-32"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(212,168,83,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(139,21,56,0.06) 0%, transparent 50%),
            linear-gradient(180deg, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_ROYAL} 50%, ${COLORS.BG_DEEP} 100%)
          `,
        }}
      >
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <ProfileLoader />
          ) : isError ? (
            <ErrorState />
          ) : (
            <>
              {/* Hero Section - Avatar, Name, Status */}
              <ProfileHero userData={userData} user={user} progress={progress} />

              {/* Detailed Info Section - Cards & Verification */}
              <DetailedInfo userData={userData} user={user} progress={progress} />

              {/* Footer Section - Sign Out & Decorative */}
              <ProfileFooter isSigningOut={isSigningOut} handleSignOut={handleSignOut} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
