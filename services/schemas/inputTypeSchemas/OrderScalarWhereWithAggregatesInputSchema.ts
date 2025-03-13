import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { EnumOrderStatusWithAggregatesFilterSchema } from './EnumOrderStatusWithAggregatesFilterSchema';
import { OrderStatusSchema } from './OrderStatusSchema';
import { EnumPaymentStatusWithAggregatesFilterSchema } from './EnumPaymentStatusWithAggregatesFilterSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const OrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrderScalarWhereWithAggregatesInputSchema),z.lazy(() => OrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  orderNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  orderStatus: z.union([ z.lazy(() => EnumOrderStatusWithAggregatesFilterSchema),z.lazy(() => OrderStatusSchema) ]).optional(),
  paymentStatus: z.union([ z.lazy(() => EnumPaymentStatusWithAggregatesFilterSchema),z.lazy(() => PaymentStatusSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default OrderScalarWhereWithAggregatesInputSchema;
