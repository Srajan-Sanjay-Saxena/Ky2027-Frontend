import { z } from "zod";

/**
 * Schema for updating a phone number (no OTP verification).
 */
export const UpdatePhoneSchema = z.object({
  phoneNumber: z.string().min(10).max(15),
});
