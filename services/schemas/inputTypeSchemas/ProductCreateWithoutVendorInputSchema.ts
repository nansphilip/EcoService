import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateNestedManyWithoutProductInputSchema } from './QuantityCreateNestedManyWithoutProductInputSchema';
import { CategoryCreateNestedOneWithoutProductsInputSchema } from './CategoryCreateNestedOneWithoutProductsInputSchema';

export const ProductCreateWithoutVendorInputSchema: z.ZodType<Prisma.ProductCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Quantity: z.lazy(() => QuantityCreateNestedManyWithoutProductInputSchema).optional(),
  Category: z.lazy(() => CategoryCreateNestedOneWithoutProductsInputSchema).optional()
}).strict();

export default ProductCreateWithoutVendorInputSchema;
