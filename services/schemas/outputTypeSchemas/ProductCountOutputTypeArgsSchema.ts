import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCountOutputTypeSelectSchema } from './ProductCountOutputTypeSelectSchema';

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ProductCountOutputTypeSelectSchema;
