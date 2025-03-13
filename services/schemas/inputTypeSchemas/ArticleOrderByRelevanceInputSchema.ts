import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleOrderByRelevanceFieldEnumSchema } from './ArticleOrderByRelevanceFieldEnumSchema';
import { SortOrderSchema } from './SortOrderSchema';

export const ArticleOrderByRelevanceInputSchema: z.ZodType<Prisma.ArticleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ArticleOrderByRelevanceFieldEnumSchema),z.lazy(() => ArticleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export default ArticleOrderByRelevanceInputSchema;
