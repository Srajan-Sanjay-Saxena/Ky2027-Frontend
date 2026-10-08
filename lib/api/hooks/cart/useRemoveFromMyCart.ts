"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { RemoveFromCartSchema } from "@/lib/api/utils/cart.schema";
import type { CartApiResponse, RemoveFromCartRequest } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UseRemoveFromMyCartOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

// ═══════════════════════════════════════════════════════════════════
// useRemoveFromMyCart Hook
// Removes an item from the user's cart
// ═══════════════════════════════════════════════════════════════════

export function useRemoveFromMyCart(options?: UseRemoveFromMyCartOptions) {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CartApiResponse>({
      url: "/user/cart/remove",
      method: "delete",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: RemoveFromCartSchema },
      invalidateQueryName: ["my-cart"],
      toastConfig: {
        successConfig: options?.successToast ? { customToast: options.successToast } : undefined,
        errorConfig: options?.errorToast ? { customToast: options.errorToast } : undefined,
      },
      mutationOptions: { retry: 2 },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to remove item from cart"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const removeFromCart = (request: RemoveFromCartRequest) => {
    mutate(request as unknown as Record<string, unknown>);
  };

  return {
    removeFromCart,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    updatedCart: data,
  };
}
