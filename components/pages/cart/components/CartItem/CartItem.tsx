"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS } from "@/components/pages/cart/constants/palette";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

interface CartItemProps {
  item: CartItemWithDetails;
  onRemove: (passId: string) => void;
  isRemoving?: boolean;
}

/**
 * Individual cart item display with pass details and remove action
 */
export function CartItem({ item, onRemove, isRemoving }: CartItemProps) {
  const total = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: GRADIENTS.CARD_BG,
        border: `1px solid rgba(212, 168, 83, 0.2)`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Accent line with pass color */}
      <div
        className="absolute top-0 right-0 left-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accentColor || COLORS.GOLD}, transparent)`,
        }}
      />

      <div className="flex gap-4 p-4">
        {/* Pass image */}
        <div
          className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg"
          style={{
            background: "linear-gradient(135deg, rgba(20, 10, 30, 0.8), rgba(30, 15, 40, 0.8))",
            border: `1px solid ${item.accentColor || COLORS.GOLD}30`,
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-1"
            sizes="80px"
          />
        </div>

        {/* Pass details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3
              className="mb-1 truncate text-lg font-bold"
              style={{ color: item.accentColor || COLORS.GOLD }}
            >
              {item.name}
            </h3>
            <p className="line-clamp-2 text-xs text-gray-400">{item.tagline}</p>
          </div>

          {/* Quantity and price */}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Qty: <span className="font-medium text-white">{item.quantity}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">₹{item.price.toLocaleString()} each</div>
              <div className="font-bold text-white">₹{total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(item.passId)}
          disabled={isRemoving}
          className="absolute top-3 right-3 rounded-full p-2 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRemoving ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
}
