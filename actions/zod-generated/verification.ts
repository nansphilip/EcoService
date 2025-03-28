import * as z from "zod"

export const VerificationModel = z.object({
  id: z.string().nanoid(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
