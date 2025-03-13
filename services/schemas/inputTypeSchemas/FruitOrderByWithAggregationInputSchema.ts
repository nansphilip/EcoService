import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { FruitCountOrderByAggregateInputSchema } from './FruitCountOrderByAggregateInputSchema';
import { FruitMaxOrderByAggregateInputSchema } from './FruitMaxOrderByAggregateInputSchema';
import { FruitMinOrderByAggregateInputSchema } from './FruitMinOrderByAggregateInputSchema';

export const FruitOrderByWithAggregationInputSchema: z.ZodType<Prisma.FruitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FruitCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FruitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FruitMinOrderByAggregateInputSchema).optional()
}).strict();

export default FruitOrderByWithAggregationInputSchema;
