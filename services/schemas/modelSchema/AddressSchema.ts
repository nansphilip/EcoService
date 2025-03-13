import { z } from 'zod';
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'

/////////////////////////////////////////
// ADDRESS SCHEMA
/////////////////////////////////////////

/**
 * Address model
 */
export const AddressSchema = z.object({
  id: z.string(),
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  country: z.string(),
  isDefault: z.boolean(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Address = z.infer<typeof AddressSchema>

/////////////////////////////////////////
// ADDRESS RELATION SCHEMA
/////////////////////////////////////////

export type AddressRelations = {
  User: UserWithRelations;
};

export type AddressWithRelations = z.infer<typeof AddressSchema> & AddressRelations

export const AddressWithRelationsSchema: z.ZodType<AddressWithRelations> = AddressSchema.merge(z.object({
  User: z.lazy(() => UserWithRelationsSchema),
}))

export default AddressSchema;
