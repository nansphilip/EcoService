import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const OrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.OrderAvgOrderByAggregateInput> = z.object({
  orderNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default OrderAvgOrderByAggregateInputSchema;
