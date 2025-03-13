import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateNestedOneWithoutQuantityInputSchema } from './ProductCreateNestedOneWithoutQuantityInputSchema';

export const QuantityCreateWithoutOrderInputSchema: z.ZodType<Prisma.QuantityCreateWithoutOrderInput> = z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutQuantityInputSchema)
}).strict();

export default QuantityCreateWithoutOrderInputSchema;
