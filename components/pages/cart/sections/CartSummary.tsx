"use client";

import { COLORS, SHADOWS } from "@/components/pages/cart/constants/palette";

interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
  onClearCart: () => void;
  onCheckout: () => void;
  isClearing?: boolean;
}

export function CartSummary({
  totalItems,
  totalAmount,
  onClearCart,
  onCheckout,
  isClearing,
}: CartSummaryProps) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(30, 20, 40, 0.98) 0%, rgba(45, 25, 55, 0.98) 100%)",
        border: `1px solid rgba(212, 168, 83, 0.3)`,
        boxShadow: SHADOWS.CARD,
      }}
    >
      <h3 className="mb-4 text-lg font-bold text-white">Order Summary</h3>

      <div className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Items ({totalItems})</span>
          <span className="text-white">₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-6 border-t border-gray-700 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-white">Total</span>
          <span style={{ color: COLORS.GOLD }}>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mb-3 w-full rounded-lg py-3 font-semibold text-white transition-all hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
          boxShadow: SHADOWS.BUTTON,
        }}
      >
        Proceed to Checkout
      </button>

      <button
        onClick={onClearCart}
        disabled={isClearing}
        className="w-full rounded-lg border border-gray-600 py-2 text-sm text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400 disabled:opacity-50"
      >
        {isClearing ? "Clearing..." : "Clear Cart"}
      </button>
    </div>
  );
}
