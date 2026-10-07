"use client";

import { useMemo } from "react";
import { useApiQuery } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type { Pass, PassesApiResponse } from "@/lib/api/helper/types";

// Re-export types for consumers
export type { Pass, PassBenefit, PassDetail } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for fetching festival passes from the backend
 * Uses wire-axon's useApiQuery for consistent API fetching
 */
export function usePasses() {
  const { data, isLoading, isError, error, refetch } = useApiQuery<PassesApiResponse>({
    queryKey: ["passes"],
    url: "/pass",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    queryOptions: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      return extractErrorMessage(error, "Failed to fetch passes");
    }
    return null;
  }, [error]);

  return {
    passes: data?.passes ?? [],
    count: data?.count ?? 0,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
}
