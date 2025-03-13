import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ArticleCountOrderByAggregateInputSchema } from './ArticleCountOrderByAggregateInputSchema';
import { ArticleMaxOrderByAggregateInputSchema } from './ArticleMaxOrderByAggregateInputSchema';
import { ArticleMinOrderByAggregateInputSchema } from './ArticleMinOrderByAggregateInputSchema';

export const ArticleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ArticleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ArticleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ArticleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ArticleMinOrderByAggregateInputSchema).optional()
}).strict();

export default ArticleOrderByWithAggregationInputSchema;
