import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductOrderByRelevanceFieldEnumSchema } from './ProductOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductOrderByRelevanceInputSchema: z.ZodType<Prisma.ProductOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ProductOrderByRelevanceFieldEnumSchema),z.lazy(() => ProductOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default ProductOrderByRelevanceInputSchema;
