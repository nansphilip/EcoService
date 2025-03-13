import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderStatusSchema } from './OrderStatusSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { QuantityUncheckedCreateNestedManyWithoutOrderInputSchema } from './QuantityUncheckedCreateNestedManyWithoutOrderInputSchema';

export const OrderUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  orderNumber: z.number().int().optional(),
  orderStatus: z.lazy(() => OrderStatusSchema).optional(),
  paymentStatus: z.lazy(() => PaymentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Quantity: z.lazy(() => QuantityUncheckedCreateNestedManyWithoutOrderInputSchema).optional()
}).strict();

export default OrderUncheckedCreateWithoutUserInputSchema;
