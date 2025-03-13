import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { QuantityCountOrderByAggregateInputSchema } from './QuantityCountOrderByAggregateInputSchema';
import { QuantityAvgOrderByAggregateInputSchema } from './QuantityAvgOrderByAggregateInputSchema';
import { QuantityMaxOrderByAggregateInputSchema } from './QuantityMaxOrderByAggregateInputSchema';
import { QuantityMinOrderByAggregateInputSchema } from './QuantityMinOrderByAggregateInputSchema';
import { QuantitySumOrderByAggregateInputSchema } from './QuantitySumOrderByAggregateInputSchema';

export const QuantityOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuantityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  orderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuantityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QuantityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuantityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuantityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QuantitySumOrderByAggregateInputSchema).optional()
}).strict();

export default QuantityOrderByWithAggregationInputSchema;
