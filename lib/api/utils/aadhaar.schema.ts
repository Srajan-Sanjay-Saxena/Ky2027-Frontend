import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// AADHAAR SCHEMAS
// ═══════════════════════════════════════════════════════════════════

export const AadhaarUploadUrlSchema = z.object({
  fileType: z.enum(["image/jpeg", "image/png"]),
});

export const ConfirmUploadSchema = z.object({
  s3Key: z.string(),
});
