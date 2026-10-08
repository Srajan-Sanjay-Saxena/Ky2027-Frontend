"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { z } from "zod";
import { XCircle } from "lucide-react";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import type { CartApiResponse } from "@/lib/api/helper/types";

// Empty schema - no body required
const ClearCartSchema = z.object({});

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UseClearMyCartOptions {
  successToast?: React.ReactElement;
  errorToast?: React.ReactElement;
}

// ═══════════════════════════════════════════════════════════════════
// Default Error Toast
// ═══════════════════════════════════════════════════════════════════

function DefaultErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Failed to clear cart</p>
        <p className="text-sm text-neutral-400">Please try again later</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// useClearMyCart Hook
// Clears all items from the user's cart
// ═══════════════════════════════════════════════════════════════════

export function useClearMyCart(options?: UseClearMyCartOptions) {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CartApiResponse>({
      url: "/user/cart/clear",
      method: "delete",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: ClearCartSchema },
      invalidateQueryName: ["my-cart"],
      toastConfig: {
        successConfig: options?.successToast ? { customToast: options.successToast } : undefined,
        errorConfig: { customToast: options?.errorToast ?? <DefaultErrorToast /> },
      },
      mutationOptions: { retry: 2 },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to clear cart"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const clearCart = () => {
    mutate({});
  };

  return {
    clearCart,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    updatedCart: data,
  };
}
