import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ArticleOrderByWithRelationInputSchema } from './ArticleOrderByWithRelationInputSchema';
import { DoItYourselfOrderByWithRelationInputSchema } from './DoItYourselfOrderByWithRelationInputSchema';
import { ContentOrderByRelevanceInputSchema } from './ContentOrderByRelevanceInputSchema';

export const ContentOrderByWithRelationInputSchema: z.ZodType<Prisma.ContentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doItYourselfId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Article: z.lazy(() => ArticleOrderByWithRelationInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => ContentOrderByRelevanceInputSchema).optional()
}).strict();

export default ContentOrderByWithRelationInputSchema;
