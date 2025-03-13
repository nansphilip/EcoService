import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  Quantity: z.boolean().optional(),
}).strict();

export default ProductCountOutputTypeSelectSchema;
