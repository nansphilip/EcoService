import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderStatusSchema } from './OrderStatusSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { QuantityUncheckedCreateNestedManyWithoutOrderInputSchema } from './QuantityUncheckedCreateNestedManyWithoutOrderInputSchema';

export const OrderUncheckedCreateInputSchema: z.ZodType<Prisma.OrderUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  orderNumber: z.number().int().optional(),
  orderStatus: z.lazy(() => OrderStatusSchema).optional(),
  paymentStatus: z.lazy(() => PaymentStatusSchema).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Quantity: z.lazy(() => QuantityUncheckedCreateNestedManyWithoutOrderInputSchema).optional()
}).strict();

export default OrderUncheckedCreateInputSchema;
