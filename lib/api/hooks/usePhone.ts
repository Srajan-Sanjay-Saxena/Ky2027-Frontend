"use client";

import { useApiMutation } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import type { PhoneUpdateData } from "@/lib/api/helper/types/phone.types";
import { UpdatePhoneSchema } from "@/lib/api/utils/phone.schema";

// Re-exported for backward compatibility.
export type { PhoneUpdateData };

// ═══════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════

/**
 * Hook for updating phone number (no OTP verification)
 * @param userId - User ID for cache invalidation
 */
export function useUpdatePhone(userId?: string) {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<PhoneUpdateData>({
    url: "/user/profile",
    method: "patch",
    baseURL: BACKEND_URL,
    featureConfig: sharedFeatureConfig,
    bodyValidator: { bodySchema: UpdatePhoneSchema },
    invalidateQueryName: ["account-progress", userId!],
    toastConfig: {
      successConfig: { message: "Phone number saved successfully!" },
      errorConfig: { message: "Failed to save phone number. Please try again." },
    },
  });

  return {
    updatePhone: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
