import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderStatusSchema } from './OrderStatusSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';

export const OrderCreateManyInputSchema: z.ZodType<Prisma.OrderCreateManyInput> = z.object({
  id: z.string().optional(),
  orderNumber: z.number().int().optional(),
  orderStatus: z.lazy(() => OrderStatusSchema).optional(),
  paymentStatus: z.lazy(() => PaymentStatusSchema).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default OrderCreateManyInputSchema;
