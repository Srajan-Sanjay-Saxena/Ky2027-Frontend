import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import {
  USER_NAVBAR_DISPLAY_QUERY,
  type UserNavbarDisplayQueryResponse,
} from "@/lib/api/graphql/queries/user.queries";

// ═══════════════════════════════════════════════════════════════════
// useProfileCompletionStatus Hook
// Lightweight hook for profile info + completion status
// Use for: Navbar display, user greeting, feature gating with UI
// ═══════════════════════════════════════════════════════════════════

export function useProfileCompletionStatus() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error } = useQuery<UserNavbarDisplayQueryResponse>(
    USER_NAVBAR_DISPLAY_QUERY,
    {
      skip: !isAuthenticated,
      fetchPolicy: "cache-first",
    }
  );

  const account = data?.myAccount;
  const profile = account?.profile;
  const progress = account?.progress;

  // Derived display values
  const displayName = profile?.firstName
    ? `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`
    : null;
  const avatarUrl = profile?.candidatePhotoUrl || profile?.googleAvatarUrl || null;

  return {
    // Auth State
    isAuthenticated,
    isAuthLoading: status === "loading",

    // Profile Completion Status
    isProfileComplete: progress?.isProfileComplete ?? false,
    completionPercentage: progress?.completionPercentage ?? 0,
    accountStatus: progress?.accountStatus ?? "ACTIVE",

    // User Display Info
    userId: profile?.id ?? null,
    displayName,
    avatarUrl,

    // Query State
    isLoading: loading,
    isError: !!error,
    error,
  };
}
