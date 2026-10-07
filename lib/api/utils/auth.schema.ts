import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════
// AUTHENTICATION SCHEMAS
// Based on NextAuth Google Provider
// SYNC WITH: backend/middleware/schemas/user/userAuth.schema.ts
// ═══════════════════════════════════════════════════════════════════

/**
 * User data sent to backend after Google OAuth
 * slugName is extracted from email (e.g., srajan.saxena@gmail.com → srajan.saxena)
 */
const GoogleUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  slugName: z.string(),
  googleAvatarUrl: z.url().optional(),
});

type GoogleUserSchemaType = z.infer<typeof GoogleUserSchema>;

export { type GoogleUserSchemaType, GoogleUserSchema };
