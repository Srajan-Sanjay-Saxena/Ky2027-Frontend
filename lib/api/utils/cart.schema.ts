import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// CART SCHEMAS
// Zod schemas for cart API validation
// ═══════════════════════════════════════════════════════════════════

/**
 * Schema for adding an item to cart
 */
export const AddToCartSchema = z.object({
  passId: z.string().min(1, "Pass ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(10, "Maximum 10 per item"),
});

export type AddToCartSchemaType = z.infer<typeof AddToCartSchema>;

/**
 * Schema for removing an item from cart
 */
export const RemoveFromCartSchema = z.object({
  passId: z.string().min(1, "Pass ID is required"),
});

export type RemoveFromCartSchemaType = z.infer<typeof RemoveFromCartSchema>;
