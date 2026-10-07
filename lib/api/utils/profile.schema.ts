import { z } from "zod";

/**
 * Schema for updating a user's college
 */
const UpdateCollegeSchema = z.object({
  college: z.string().min(2).max(200),
});

export { UpdateCollegeSchema };
