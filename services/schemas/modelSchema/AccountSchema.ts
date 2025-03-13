import { z } from 'zod';
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

/**
 * Account model (BetterAuth)
 */
export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  idToken: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT RELATION SCHEMA
/////////////////////////////////////////

export type AccountRelations = {
  User: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  User: z.lazy(() => UserWithRelationsSchema),
}))

export default AccountSchema;
