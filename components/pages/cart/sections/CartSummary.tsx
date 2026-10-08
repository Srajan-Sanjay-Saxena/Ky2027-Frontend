"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CreditCard, Trash2, ShieldCheck, ArrowRight, Sparkles, Crown } from "lucide-react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.01 : 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(30, 20, 40, 0.98) 0%, rgba(45, 25, 55, 0.98) 100%)",
        border: `2px solid ${COLORS.GOLD}30`,
        boxShadow: `0 0 40px rgba(0,0,0,0.5), inset 0 1px 0 ${COLORS.GOLD}15`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-0 left-0 h-6 w-6 opacity-40">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z" fill={COLORS.GOLD} />
        </svg>
      </div>
      <div className="absolute top-0 right-0 h-6 w-6 rotate-90 opacity-40">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z" fill={COLORS.GOLD} />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 h-6 w-6 -rotate-90 opacity-40">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z" fill={COLORS.GOLD} />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 h-6 w-6 rotate-180 opacity-40">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M0 0 L10 0 L10 2 L2 2 L2 10 L0 10 Z" fill={COLORS.GOLD} />
        </svg>
      </div>

      {/* Header */}
      <div
        className="relative px-6 py-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}20, ${COLORS.DARK_GOLD}10)`,
          borderBottom: `1px solid ${COLORS.GOLD}25`,
        }}
      >
        {/* Crown decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Crown className="h-6 w-6" style={{ color: `${COLORS.GOLD}50` }} />
        </div>

        <div className="flex items-center justify-center gap-3">
          <CreditCard className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          <h3
            className="text-lg font-bold"
            style={{
              color: COLORS.GOLD,
              textShadow: `0 0 20px ${COLORS.GOLD}30`,
            }}
          >
            Order Summary
          </h3>
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
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">GST</span>
            <span className="font-medium text-gray-500">Included</span>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="relative mb-6">
          <div
            className="h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}40, transparent)`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2d1a35] px-2">
            <Sparkles className="h-4 w-4" style={{ color: `${COLORS.GOLD}60` }} />
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Total Amount</span>
          <div className="text-right">
            <motion.span
              animate={{
                textShadow: [
                  `0 0 20px ${COLORS.GOLD}40`,
                  `0 0 30px ${COLORS.GOLD}60`,
                  `0 0 20px ${COLORS.GOLD}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl font-bold"
              style={{ color: COLORS.GOLD }}
            >
              ₹{totalAmount.toLocaleString()}
            </motion.span>
          </div>
        </div>

        {/* Checkout button with shimmer */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="group relative mb-4 w-full overflow-hidden rounded-xl py-4 font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}, ${COLORS.DARK_GOLD})`,
            boxShadow: `0 0 30px ${COLORS.GOLD}40, 0 4px 15px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              width: "50%",
            }}
          />

          <span className="relative flex items-center justify-center gap-2">
            Proceed to Checkout
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
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
        <div className="mt-6 rounded-lg p-3" style={{ background: `${COLORS.GOLD}08` }}>
          <div
            className="flex items-center justify-center gap-2 text-xs"
            style={{ color: `${COLORS.GOLD}80` }}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Secure checkout with encrypted payment</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
