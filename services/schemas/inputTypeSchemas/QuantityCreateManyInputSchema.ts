import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const QuantityCreateManyInputSchema: z.ZodType<Prisma.QuantityCreateManyInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  productId: z.string(),
  orderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default QuantityCreateManyInputSchema;
