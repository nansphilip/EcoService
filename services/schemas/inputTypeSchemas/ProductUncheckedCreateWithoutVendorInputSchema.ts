import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityUncheckedCreateNestedManyWithoutProductInputSchema } from './QuantityUncheckedCreateNestedManyWithoutProductInputSchema';

export const ProductUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Quantity: z.lazy(() => QuantityUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export default ProductUncheckedCreateWithoutVendorInputSchema;
