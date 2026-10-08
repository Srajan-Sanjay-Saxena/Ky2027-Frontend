"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/components/pages/cart/constants/palette";

export function CartLoader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="mb-6 h-12 w-12 rounded-full border-4 border-transparent"
        style={{
          borderTopColor: COLORS.GOLD,
          borderRightColor: `${COLORS.GOLD}40`,
        }}
      />
      <p className="text-gray-400">Loading your cart...</p>
    </div>
  );
}
