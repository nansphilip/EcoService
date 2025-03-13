import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { FruitOrderByRelevanceFieldEnumSchema } from './FruitOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const FruitOrderByRelevanceInputSchema: z.ZodType<Prisma.FruitOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => FruitOrderByRelevanceFieldEnumSchema),z.lazy(() => FruitOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default FruitOrderByRelevanceInputSchema;
