"use client";

import { XCircle } from "lucide-react";
import { COLORS } from "@/components/pages/passes/constants/palette";

interface AddToCartErrorToastProps {
  message?: string;
}

/**
 * Error toast shown when adding to cart fails
 */
export function AddToCartErrorToast({ message }: AddToCartErrorToastProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: `${COLORS.MAROON}30` }}
      >
        <XCircle className="h-5 w-5" style={{ color: COLORS.MAROON }} />
      </div>
      <div>
        <p className="font-semibold text-white">Failed to add to cart</p>
        <p className="text-sm text-neutral-400">{message || "Please try again later"}</p>
      </div>
    </div>
  );
}
