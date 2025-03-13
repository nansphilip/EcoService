import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ProductCreateManyVendorInputSchema: z.ZodType<Prisma.ProductCreateManyVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  categoryId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ProductCreateManyVendorInputSchema;
