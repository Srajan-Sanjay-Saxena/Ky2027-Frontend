"use client";

import { AnimatePresence } from "framer-motion";
import { CartItem } from "@/components/pages/cart/components/CartItem";
import type { CartItemWithDetails } from "@/lib/api/helper/types";

interface CartSectionProps {
  items: CartItemWithDetails[];
  onRemove: (passId: string) => void;
  removingId?: string | null;
}

export function CartSection({ items, onRemove, removingId }: CartSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Your Cart ({items.length} items)</h2>
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <CartItem
            key={item.passId}
            item={item}
            onRemove={onRemove}
            isRemoving={removingId === item.passId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
