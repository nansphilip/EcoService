import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const OrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.OrderSumOrderByAggregateInput> = z.object({
  orderNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default OrderSumOrderByAggregateInputSchema;
