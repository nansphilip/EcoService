import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { DoItYourselfCountOrderByAggregateInputSchema } from './DoItYourselfCountOrderByAggregateInputSchema';
import { DoItYourselfMaxOrderByAggregateInputSchema } from './DoItYourselfMaxOrderByAggregateInputSchema';
import { DoItYourselfMinOrderByAggregateInputSchema } from './DoItYourselfMinOrderByAggregateInputSchema';

export const DoItYourselfOrderByWithAggregationInputSchema: z.ZodType<Prisma.DoItYourselfOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DoItYourselfCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DoItYourselfMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DoItYourselfMinOrderByAggregateInputSchema).optional()
}).strict();

export default DoItYourselfOrderByWithAggregationInputSchema;
