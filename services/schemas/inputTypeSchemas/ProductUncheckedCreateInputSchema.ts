import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityUncheckedCreateNestedManyWithoutProductInputSchema } from './QuantityUncheckedCreateNestedManyWithoutProductInputSchema';

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  vendorId: z.string(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Quantity: z.lazy(() => QuantityUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export default ProductUncheckedCreateInputSchema;
