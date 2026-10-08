"use client";

import { motion } from "framer-motion";
import { CreditCard, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(30, 20, 40, 0.98) 0%, rgba(45, 25, 55, 0.98) 100%)",
        border: `1px solid rgba(212, 168, 83, 0.3)`,
        boxShadow: SHADOWS.CARD,
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.DARK_GOLD}10)`,
          borderBottom: `1px solid ${COLORS.GOLD}20`,
        }}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          <h3 className="text-lg font-bold text-white">Order Summary</h3>
        </div>
      </div>

      <div className="p-6">
        {/* Line items */}
        <div className="mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal ({totalItems} items)</span>
            <span className="font-medium text-white">₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Platform Fee</span>
            <span className="font-medium text-green-400">FREE</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}30, transparent)`,
          }}
        />

        {/* Total */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Total Amount</span>
          <div className="text-right">
            <span
              className="text-2xl font-bold"
              style={{
                color: COLORS.GOLD,
                textShadow: `0 0 20px ${COLORS.GOLD}40`,
              }}
            >
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Checkout button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="group mb-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-all"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
            boxShadow: `0 0 20px ${COLORS.GOLD}30, ${SHADOWS.BUTTON}`,
          }}
        >
          Proceed to Checkout
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Clear cart button */}
        <button
          onClick={onClearCart}
          disabled={isClearing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            borderColor: "rgba(100, 100, 100, 0.3)",
            color: "rgba(160, 160, 160, 1)",
          }}
        >
          <Trash2 className="h-4 w-4" />
          {isClearing ? "Clearing..." : "Clear Cart"}
        </button>

        {/* Security badge */}
        <div className="mt-6 border-t border-gray-700/50 pt-4">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4" />
            <span>Secure checkout with encrypted payment</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
