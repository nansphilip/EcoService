import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutAdressInputSchema } from './UserCreateNestedOneWithoutAdressInputSchema';

export const AddressCreateInputSchema: z.ZodType<Prisma.AddressCreateInput> = z.object({
  id: z.string().optional(),
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  country: z.string(),
  isDefault: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutAdressInputSchema)
}).strict();

export default AddressCreateInputSchema;
