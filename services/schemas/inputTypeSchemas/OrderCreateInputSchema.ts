import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderStatusSchema } from './OrderStatusSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { UserCreateNestedOneWithoutOrderInputSchema } from './UserCreateNestedOneWithoutOrderInputSchema';
import { QuantityCreateNestedManyWithoutOrderInputSchema } from './QuantityCreateNestedManyWithoutOrderInputSchema';

export const OrderCreateInputSchema: z.ZodType<Prisma.OrderCreateInput> = z.object({
  id: z.string().optional(),
  orderNumber: z.number().int().optional(),
  orderStatus: z.lazy(() => OrderStatusSchema).optional(),
  paymentStatus: z.lazy(() => PaymentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutOrderInputSchema),
  Quantity: z.lazy(() => QuantityCreateNestedManyWithoutOrderInputSchema).optional()
}).strict();

export default OrderCreateInputSchema;
