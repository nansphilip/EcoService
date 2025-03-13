import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { QuantityOrderByRelationAggregateInputSchema } from './QuantityOrderByRelationAggregateInputSchema';
import { OrderOrderByRelevanceInputSchema } from './OrderOrderByRelevanceInputSchema';

export const OrderOrderByWithRelationInputSchema: z.ZodType<Prisma.OrderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderNumber: z.lazy(() => SortOrderSchema).optional(),
  orderStatus: z.lazy(() => SortOrderSchema).optional(),
  paymentStatus: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  Quantity: z.lazy(() => QuantityOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => OrderOrderByRelevanceInputSchema).optional()
}).strict();

export default OrderOrderByWithRelationInputSchema;
