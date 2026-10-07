import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import {
  FULL_ACCOUNT_QUERY,
  type FullAccountQueryResponse,
} from "@/lib/api/graphql/queries/user.queries";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// useFullAccount Hook
// Fetches complete user profile + full account progress
// Use for: Account settings, profile editing, user dashboard
// ═══════════════════════════════════════════════════════════════════

export function useFullAccount() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error, refetch } = useQuery<FullAccountQueryResponse>(FULL_ACCOUNT_QUERY, {
    skip: !isAuthenticated,
    fetchPolicy: "cache-first",
  });

  const account = data?.myAccount ?? null;

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch account");
    }
    return null;
  }, [error]);

  return {
    // Data
    account,
    profile: account?.profile ?? null,
    progress: account?.progress ?? null,

    // Loading & Error States
    isLoading: loading,
    isError: !!error,
    errorMessage,

    // Actions
    refetch,
  };
}
