import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * User model
 */
export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string(),
  /**
   * Firstname Lastname
   */
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  phone: z.string().nullable(),
  /**
   * Regular Stripe Customer ID
   */
  stripeId: z.string().nullable(),
  /**
   * Stripe Connect Account ID
   */
  stripeConnectId: z.string().nullable(),
  /**
   * Track if seller has completed Stripe onboarding
   */
  isOnboarded: z.boolean(),
  /**
   * Track if user wants to be a seller
   */
  isSeller: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
