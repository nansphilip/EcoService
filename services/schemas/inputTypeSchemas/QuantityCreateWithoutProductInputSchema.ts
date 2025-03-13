import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderCreateNestedOneWithoutQuantityInputSchema } from './OrderCreateNestedOneWithoutQuantityInputSchema';

export const QuantityCreateWithoutProductInputSchema: z.ZodType<Prisma.QuantityCreateWithoutProductInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Order: z.lazy(() => OrderCreateNestedOneWithoutQuantityInputSchema)
}).strict();

export default QuantityCreateWithoutProductInputSchema;
