import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const AddressUncheckedCreateInputSchema: z.ZodType<Prisma.AddressUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  country: z.string(),
  isDefault: z.boolean(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default AddressUncheckedCreateInputSchema;
