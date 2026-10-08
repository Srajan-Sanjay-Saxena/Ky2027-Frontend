"use client";

import { useEffect, useState } from "react";
import { useApiMutation } from "wire-axon/hooks";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { BACKEND_URL, sharedFeatureConfig } from "@/lib/api/constants";
import { extractErrorMessage } from "@/lib/api/helper/functions/error.functions";
import { UpdateCartQuantitySchema } from "@/lib/api/utils/cart.schema";
import type { CartApiResponse } from "@/lib/api/helper/types";

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface UpdateQuantityRequest {
  passId: string;
  quantity: number;
}

// ═══════════════════════════════════════════════════════════════════
// Success Toast
// ═══════════════════════════════════════════════════════════════════

function QuantityUpdatedToast() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/90 to-stone-900/90 px-4 py-3 shadow-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
        <Plus className="h-4 w-4 text-amber-400" />
      </div>
      <p className="text-sm font-medium text-amber-100">Quantity updated</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Error Toast
// ═══════════════════════════════════════════════════════════════════

function QuantityErrorToast() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-gradient-to-r from-red-950/90 to-stone-900/90 px-4 py-3 shadow-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
        <Minus className="h-4 w-4 text-red-400" />
      </div>
      <p className="text-sm font-medium text-red-100">Failed to update quantity</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// useUpdateCartQuantity Hook
// Updates the quantity of a specific item in the cart
// ═══════════════════════════════════════════════════════════════════

export function useUpdateCartQuantity() {
  const { mutate, isPending, isSuccess, isError, error, reset, data } =
    useApiMutation<CartApiResponse>({
      url: "/user/cart/update-quantity",
      method: "patch",
      baseURL: BACKEND_URL,
      featureConfig: sharedFeatureConfig,
      bodyValidator: { bodySchema: UpdateCartQuantitySchema },
      invalidateQueryName: ["my-cart"],
      toastConfig: {
        successConfig: { customToast: <QuantityUpdatedToast /> },
        errorConfig: { customToast: <QuantityErrorToast /> },
      },
      mutationOptions: { retry: 1 },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(extractErrorMessage(error, "Failed to update quantity"));
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  const updateQuantity = (
    request: UpdateQuantityRequest,
    callbacks?: { onSettled?: () => void }
  ) => {
    mutate(request as unknown as Record<string, unknown>, {
      onSettled: callbacks?.onSettled,
    });
  };

  return {
    mutate: updateQuantity,
    reset,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    updatedCart: data,
  };
}
