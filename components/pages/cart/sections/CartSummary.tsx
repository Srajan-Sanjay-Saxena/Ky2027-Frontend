"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Trash2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Crown,
  Tag,
  X,
  Check,
  Loader2,
  Gift,
  Percent,
} from "lucide-react";
import { COLORS } from "@/components/pages/cart/constants/palette";

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
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

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

  // Calculate discount amount
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round((totalAmount * appliedCoupon.discount) / 100)
      : appliedCoupon.discount
    : 0;

  const finalAmount = totalAmount - discountAmount;

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError(null);

    // TODO: Replace with actual API call
    // Simulating API call for now
    setTimeout(() => {
      // Mock response - in real implementation, call the backend API
      if (couponCode.toUpperCase() === "KASHIYATRA10") {
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          discount: 10,
          type: "percentage",
        });
        setCouponCode("");
      } else if (couponCode.toUpperCase() === "YATRA500") {
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          discount: 500,
          type: "fixed",
        });
        setCouponCode("");
      } else {
        setCouponError("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
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
          "linear-gradient(135deg, rgba(25, 15, 35, 0.98) 0%, rgba(40, 20, 50, 0.98) 100%)",
        border: `2px solid ${COLORS.GOLD}40`,
        boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 40px ${COLORS.GOLD}08, inset 0 1px 0 ${COLORS.GOLD}20`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Animated border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}15 0%, transparent 50%, ${COLORS.GOLD}10 100%)`,
        }}
      />

      {/* Corner ornaments */}
      {[
        "top-0 left-0",
        "top-0 right-0 rotate-90",
        "bottom-0 left-0 -rotate-90",
        "bottom-0 right-0 rotate-180",
      ].map((position, i) => (
        <div key={i} className={`absolute h-8 w-8 opacity-50 ${position}`}>
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M0 0 L14 0 L14 2 L2 2 L2 14 L0 14 Z" fill={COLORS.GOLD} />
            <path
              d="M4 0 L4 4 L0 4"
              stroke={COLORS.GOLD}
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}

      {/* Header with enhanced styling */}
      <div
        className="relative px-6 py-5"
        style={{
          background: `linear-gradient(135deg, ${COLORS.GOLD}15, ${COLORS.DARK_GOLD}08)`,
          borderBottom: `1px solid ${COLORS.GOLD}30`,
        }}
      >
        {/* Crown decoration */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div
            className="rounded-full p-2"
            style={{
              background: `linear-gradient(135deg, ${COLORS.GOLD}30, ${COLORS.DARK_GOLD}20)`,
              border: `1px solid ${COLORS.GOLD}40`,
            }}
          >
            <Crown className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <CreditCard className="h-5 w-5" style={{ color: COLORS.GOLD }} />
          <h3
            className="text-xl font-bold tracking-wide"
            style={{
              color: COLORS.GOLD,
              textShadow: `0 0 30px ${COLORS.GOLD}40`,
              fontFamily: "var(--font-ethereal), serif",
            }}
          >
            Order Summary
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* Price breakdown with better styling */}
        <div className="mb-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal ({totalItems} items)</span>
            <span className="font-semibold text-white">₹{totalAmount.toLocaleString()}</span>
          </div>

          {/* Applied coupon discount */}
          <AnimatePresence>
            {appliedCoupon && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between text-sm"
              >
                <span className="flex items-center gap-1.5 text-green-400">
                  <Tag className="h-3.5 w-3.5" />
                  Coupon ({appliedCoupon.code})
                </span>
                <span className="font-semibold text-green-400">
                  -₹{discountAmount.toLocaleString()}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Platform Fee</span>
            <span
              className="font-semibold"
              style={{
                color: "#4ade80",
                textShadow: "0 0 10px rgba(74, 222, 128, 0.3)",
              }}
            >
              FREE
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">GST</span>
            <span className="font-medium text-gray-500">Included</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div
          className="mb-5 rounded-xl p-4"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}08, transparent)`,
            border: `1px solid ${COLORS.GOLD}20`,
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Gift className="h-4 w-4" style={{ color: COLORS.GOLD }} />
            <span className="text-sm font-medium" style={{ color: COLORS.GOLD }}>
              Have a coupon?
            </span>
          </div>

          {appliedCoupon ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-between rounded-lg p-3"
              style={{
                background: "rgba(74, 222, 128, 0.1)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400">{appliedCoupon.code}</p>
                  <p className="text-xs text-green-400/70">
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.discount}% off`
                      : `₹${appliedCoupon.discount} off`}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="rounded-full p-1.5 text-green-400/70 transition-colors hover:bg-green-500/20 hover:text-green-400"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setCouponError(null);
                  }}
                  placeholder="Enter code"
                  className="flex-1 rounded-lg bg-black/30 px-3 py-2.5 text-sm text-white placeholder-gray-500 transition-all outline-none focus:ring-2"
                  style={{
                    border: `1px solid ${couponError ? "rgba(239, 68, 68, 0.5)" : `${COLORS.GOLD}30`}`,
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${COLORS.GOLD}20`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.GOLD}80, ${COLORS.DARK_GOLD})`,
                  }}
                >
                  {isApplyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Percent className="h-3.5 w-3.5" />
                      Apply
                    </>
                  )}
                </motion.button>
              </div>
              <AnimatePresence>
                {couponError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-400"
                  >
                    {couponError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Decorative divider with sparkle */}
        <div className="relative mb-5">
          <div
            className="h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.GOLD}50, transparent)`,
            }}
          />
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
            style={{ background: "rgba(40, 20, 50, 1)" }}
          >
            <Sparkles className="h-4 w-4" style={{ color: `${COLORS.GOLD}80` }} />
          </motion.div>
        </div>

        {/* Total with animated glow */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Total Amount</span>
          <div className="text-right">
            {appliedCoupon && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mr-2 text-sm text-gray-500 line-through"
              >
                ₹{totalAmount.toLocaleString()}
              </motion.span>
            )}
            <motion.span
              animate={{
                textShadow: [
                  `0 0 20px ${COLORS.GOLD}40`,
                  `0 0 40px ${COLORS.GOLD}60`,
                  `0 0 20px ${COLORS.GOLD}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl font-bold"
              style={{ color: COLORS.GOLD }}
            >
              ₹{finalAmount.toLocaleString()}
            </motion.span>
          </div>
        </div>

        {/* Savings badge */}
        <AnimatePresence>
          {appliedCoupon && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-4 flex items-center justify-center gap-2 rounded-lg py-2"
              style={{
                background: "rgba(74, 222, 128, 0.1)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
              }}
            >
              <Gift className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                You save ₹{discountAmount.toLocaleString()}!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout button with premium shimmer */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${COLORS.GOLD}50` }}
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
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              width: "50%",
            }}
          />

          <span className="relative flex items-center justify-center gap-2 text-base">
            Proceed to Checkout
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>

        {/* Clear cart button */}
        <motion.button
          whileHover={{ scale: 1.01, borderColor: "rgba(239, 68, 68, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearCart}
          disabled={isClearing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm transition-all hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            borderColor: "rgba(100, 100, 100, 0.3)",
            color: "rgba(160, 160, 160, 1)",
          }}
        >
          {isClearing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {isClearing ? "Clearing..." : "Clear Cart"}
        </motion.button>

        {/* Security badge with enhanced styling */}
        <div
          className="mt-5 rounded-xl p-3"
          style={{
            background: `linear-gradient(135deg, ${COLORS.GOLD}06, transparent)`,
            border: `1px solid ${COLORS.GOLD}15`,
          }}
        >
          <div
            className="flex items-center justify-center gap-2 text-xs"
            style={{ color: `${COLORS.GOLD}90` }}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Secure checkout with encrypted payment</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
