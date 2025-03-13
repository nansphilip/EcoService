import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'
import { ArticleWithRelationsSchema } from './ArticleSchema'
import type { ArticleWithRelations } from './ArticleSchema'
import { DoItYourselfWithRelationsSchema } from './DoItYourselfSchema'
import type { DoItYourselfWithRelations } from './DoItYourselfSchema'
import { AddressWithRelationsSchema } from './AddressSchema'
import type { AddressWithRelations } from './AddressSchema'
import { OrderWithRelationsSchema } from './OrderSchema'
import type { OrderWithRelations } from './OrderSchema'
import { ProductWithRelationsSchema } from './ProductSchema'
import type { ProductWithRelations } from './ProductSchema'
import { SessionWithRelationsSchema } from './SessionSchema'
import type { SessionWithRelations } from './SessionSchema'
import { AccountWithRelationsSchema } from './AccountSchema'
import type { AccountWithRelations } from './AccountSchema'

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

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  Article: ArticleWithRelations[];
  DoItYourself: DoItYourselfWithRelations[];
  Adress: AddressWithRelations[];
  Order: OrderWithRelations[];
  Product: ProductWithRelations[];
  Session: SessionWithRelations[];
  Account: AccountWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  Article: z.lazy(() => ArticleWithRelationsSchema).array(),
  DoItYourself: z.lazy(() => DoItYourselfWithRelationsSchema).array(),
  Adress: z.lazy(() => AddressWithRelationsSchema).array(),
  Order: z.lazy(() => OrderWithRelationsSchema).array(),
  Product: z.lazy(() => ProductWithRelationsSchema).array(),
  Session: z.lazy(() => SessionWithRelationsSchema).array(),
  Account: z.lazy(() => AccountWithRelationsSchema).array(),
}))

export default UserSchema;
