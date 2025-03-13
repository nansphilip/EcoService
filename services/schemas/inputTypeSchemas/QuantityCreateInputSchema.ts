import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateNestedOneWithoutQuantityInputSchema } from './ProductCreateNestedOneWithoutQuantityInputSchema';
import { OrderCreateNestedOneWithoutQuantityInputSchema } from './OrderCreateNestedOneWithoutQuantityInputSchema';

export const QuantityCreateInputSchema: z.ZodType<Prisma.QuantityCreateInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutQuantityInputSchema),
  Order: z.lazy(() => OrderCreateNestedOneWithoutQuantityInputSchema)
}).strict();

export default QuantityCreateInputSchema;
