"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import {
  CollegeSuccessToast,
  CollegeErrorToast,
} from "@/components/pages/complete-profile/steps/college/toasts";
import type { UpdateCollegeData } from "@/lib/api/helper/types/profile.types";
import { UpdateCollegeSchema } from "@/lib/api/utils/profile.schema";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";

// Re-export for backward compatibility
export type { UpdateCollegeData };

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for updating user's college
 * @param userId - User ID for cache invalidation
 */
export function useUpdateCollege(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<{
    id: string;
    college: string;
  }>({
    url: "/user/profile",
    method: "patch",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: UpdateCollegeSchema },
    invalidateQueryName: ["account-progress", userId!],
    toastConfig: {
      successConfig: { customToast: <CollegeSuccessToast /> },
      errorConfig: { customToast: <CollegeErrorToast /> },
    },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to update college"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return {
    updateCollege: mutate,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  };
}
