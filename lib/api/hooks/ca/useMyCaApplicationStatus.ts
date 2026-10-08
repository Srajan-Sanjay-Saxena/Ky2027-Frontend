"use client";

import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {
  CA_APPLICATION_STATUS_QUERY,
  type CaApplicationStatusQueryResponse,
} from "@/lib/api/graphql";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// ═══════════════════════════════════════════════════════════════════
// useMyCaApplicationStatus Hook
// Lightweight hook - only fetches CA application status
// Use for: CA page to show appropriate UI based on application state
// ═══════════════════════════════════════════════════════════════════

export function useMyCaApplicationStatus() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;

  const { data, loading, error, refetch } = useQuery<CaApplicationStatusQueryResponse>(
    CA_APPLICATION_STATUS_QUERY,
    {
      skip: !isAuthenticated,
      fetchPolicy: "cache-and-network",
    }
  );

  const caInfo = data?.myCaInfo;

  // Derived state
  const hasApplied = caInfo?.hasApplied ?? false;
  const applicationStatus = caInfo?.application?.status ?? null;
  const appliedAt = caInfo?.application?.appliedAt ?? null;

  // Status flags for easy UI conditionals
  const isPending = hasApplied && applicationStatus === "PENDING";
  const isApproved = hasApplied && applicationStatus === "ACCEPTED";
  const isRejected = hasApplied && applicationStatus === "REJECTED";

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch CA application status");
    }
    return null;
  }, [error]);

  return {
    // Auth State
    isAuthenticated,
    isAuthLoading: status === "loading",

    // Application State
    hasApplied,
    applicationStatus,
    appliedAt,

    // Status Flags (for UI conditionals)
    isPending,
    isApproved,
    isRejected,

    // Query State
    isLoading: loading,
    isError: !!error,
    errorMessage,

    // Actions
    refetch,
  };
}
