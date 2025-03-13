import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderStatusSchema } from './OrderStatusSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';

export const OrderCreateManyUserInputSchema: z.ZodType<Prisma.OrderCreateManyUserInput> = z.object({
  id: z.string().optional(),
  orderNumber: z.number().int().optional(),
  orderStatus: z.lazy(() => OrderStatusSchema).optional(),
  paymentStatus: z.lazy(() => PaymentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default OrderCreateManyUserInputSchema;
