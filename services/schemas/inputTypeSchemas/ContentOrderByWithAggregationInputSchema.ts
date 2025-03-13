import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ContentCountOrderByAggregateInputSchema } from './ContentCountOrderByAggregateInputSchema';
import { ContentMaxOrderByAggregateInputSchema } from './ContentMaxOrderByAggregateInputSchema';
import { ContentMinOrderByAggregateInputSchema } from './ContentMinOrderByAggregateInputSchema';

export const ContentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  articleId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  doItYourselfId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContentMinOrderByAggregateInputSchema).optional()
}).strict();

export default ContentOrderByWithAggregationInputSchema;
