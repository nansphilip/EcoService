import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategoryOrderByRelevanceFieldEnumSchema } from './CategoryOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const CategoryOrderByRelevanceInputSchema: z.ZodType<Prisma.CategoryOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CategoryOrderByRelevanceFieldEnumSchema),z.lazy(() => CategoryOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default CategoryOrderByRelevanceInputSchema;
