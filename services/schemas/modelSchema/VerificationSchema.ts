import { z } from 'zod';

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

/**
 * Verification model (BetterAuth)
 */
export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Verification = z.infer<typeof VerificationSchema>

export default VerificationSchema;
