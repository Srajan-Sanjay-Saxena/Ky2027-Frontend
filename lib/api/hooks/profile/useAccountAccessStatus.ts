import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {
  ACCOUNT_ACCESS_STATUS_QUERY,
  type AccountAccessStatusQueryResponse,
} from "@/lib/api/graphql/queries/user.queries";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// useAccountAccessStatus Hook
// Most lightweight hook - only checks isProfileComplete & accountStatus
// Use for: Feature gating, access control, eligibility checks
// ═══════════════════════════════════════════════════════════════════

export function useAccountAccessStatus() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error, refetch } = useQuery<AccountAccessStatusQueryResponse>(
    ACCOUNT_ACCESS_STATUS_QUERY,
    {
      skip: !isAuthenticated,
      fetchPolicy: "cache-first",
    }
  );

  const progress = data?.myAccount?.progress;

  // Derived access flags
  const isProfileComplete = progress?.isProfileComplete ?? false;
  const accountStatus = progress?.accountStatus ?? "ACTIVE";
  const isAccountActive = accountStatus === "ACTIVE";
  const canAccessGatedFeatures = isProfileComplete && isAccountActive;

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to check account status");
    }
    return null;
  }, [error]);

  return {
    // Auth State
    isAuthenticated,
    isAuthLoading: status === "loading",

    // Access Status
    isProfileComplete,
    accountStatus,
    isAccountActive,
    canAccessGatedFeatures,

    // Query State
    isLoading: loading,
    isError: !!error,
    errorMessage,

    // Actions
    refetch,
  };
}
