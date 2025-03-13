import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentOrderByRelevanceFieldEnumSchema } from './ContentOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const ContentOrderByRelevanceInputSchema: z.ZodType<Prisma.ContentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ContentOrderByRelevanceFieldEnumSchema),z.lazy(() => ContentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default ContentOrderByRelevanceInputSchema;
