import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const QuantityCreateManyProductInputSchema: z.ZodType<Prisma.QuantityCreateManyProductInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  orderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default QuantityCreateManyProductInputSchema;
