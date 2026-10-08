"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { XCircle } from "lucide-react";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { AddToCartSchema } from "@/lib/api/utils/cart.schema";
import type { CartApiResponse, AddToCartRequest } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UseAddToMyCartOptions {
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
        <p className="font-semibold text-white">Failed to add to cart</p>
        <p className="text-sm text-neutral-400">Please try again later</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// useAddToMyCart Hook
// Adds an item to the user's cart
// ═══════════════════════════════════════════════════════════════════

export function useAddToMyCart(options?: UseAddToMyCartOptions) {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CartApiResponse>({
      url: "/user/cart/add",
      method: "post",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: AddToCartSchema },
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
      setErrorMessage(extractErrorMessage(error, "Failed to add item to cart"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const addToCart = (request: AddToCartRequest) => {
    mutate(request as unknown as Record<string, unknown>);
  };

  return {
    addToCart,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    updatedCart: data,
  };
}
