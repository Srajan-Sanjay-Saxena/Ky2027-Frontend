"use client";

import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { BACKEND_URL, sharedFeatureConfig } from "../../constants";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

export interface UpdateCollegeData {
  college: string;
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMAS
// ═══════════════════════════════════════════════════════════════════

const UpdateCollegeSchema = z.object({
  college: z.string().min(2).max(200),
});

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for updating user's college
 * @param userId - User ID for cache invalidation
 */
export function useUpdateCollege(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<
    { id: string; college: string }
  >({
    url: "/user/profile",
    method: "patch",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: UpdateCollegeSchema },
    invalidateQueryName: ["account-progress", userId!],
    toastConfig: {
      successConfig: { message: "College updated successfully!" },
      errorConfig: { message: "Failed to update college." },
    },
  });

  return {
    updateCollege: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
