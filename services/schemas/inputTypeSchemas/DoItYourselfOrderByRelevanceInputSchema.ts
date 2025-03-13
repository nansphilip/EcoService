import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfOrderByRelevanceFieldEnumSchema } from './DoItYourselfOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const DoItYourselfOrderByRelevanceInputSchema: z.ZodType<Prisma.DoItYourselfOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => DoItYourselfOrderByRelevanceFieldEnumSchema),z.lazy(() => DoItYourselfOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default DoItYourselfOrderByRelevanceInputSchema;
