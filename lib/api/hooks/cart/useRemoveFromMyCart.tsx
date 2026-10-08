"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { XCircle } from "lucide-react";
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
// Default Error Toast
// ═══════════════════════════════════════════════════════════════════

function DefaultErrorToast() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-5 w-5 text-red-400" />
      </div>
      <div>
        <p className="font-semibold text-white">Failed to remove item</p>
        <p className="text-sm text-neutral-400">Please try again later</p>
      </div>
    </div>
  );
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
        errorConfig: { customToast: options?.errorToast ?? <DefaultErrorToast /> },
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
