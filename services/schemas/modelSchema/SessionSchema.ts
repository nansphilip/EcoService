import { z } from 'zod';
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

/**
 * Session model (BetterAuth)
 */
export const SessionSchema = z.object({
  id: z.string(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION RELATION SCHEMA
/////////////////////////////////////////

export type SessionRelations = {
  User: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  User: z.lazy(() => UserWithRelationsSchema),
}))

export default SessionSchema;
