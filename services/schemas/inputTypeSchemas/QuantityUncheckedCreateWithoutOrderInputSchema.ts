import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const QuantityUncheckedCreateWithoutOrderInputSchema: z.ZodType<Prisma.QuantityUncheckedCreateWithoutOrderInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  productId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default QuantityUncheckedCreateWithoutOrderInputSchema;
