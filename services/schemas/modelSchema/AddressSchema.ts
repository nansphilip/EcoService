import { z } from 'zod';

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

export default AddressSchema;
