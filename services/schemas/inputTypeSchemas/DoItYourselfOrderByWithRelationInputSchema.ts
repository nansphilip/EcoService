import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ContentOrderByRelationAggregateInputSchema } from './ContentOrderByRelationAggregateInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { DoItYourselfOrderByRelevanceInputSchema } from './DoItYourselfOrderByRelevanceInputSchema';

export const DoItYourselfOrderByWithRelationInputSchema: z.ZodType<Prisma.DoItYourselfOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Content: z.lazy(() => ContentOrderByRelationAggregateInputSchema).optional(),
  Author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => DoItYourselfOrderByRelevanceInputSchema).optional()
}).strict();

export default DoItYourselfOrderByWithRelationInputSchema;
