import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { OrderStatusSchema } from './OrderStatusSchema';
import { EnumOrderStatusFieldUpdateOperationsInputSchema } from './EnumOrderStatusFieldUpdateOperationsInputSchema';
import { PaymentStatusSchema } from './PaymentStatusSchema';
import { EnumPaymentStatusFieldUpdateOperationsInputSchema } from './EnumPaymentStatusFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutOrderNestedInputSchema } from './UserUpdateOneRequiredWithoutOrderNestedInputSchema';
import { QuantityUpdateManyWithoutOrderNestedInputSchema } from './QuantityUpdateManyWithoutOrderNestedInputSchema';

export const OrderUpdateInputSchema: z.ZodType<Prisma.OrderUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderStatus: z.union([ z.lazy(() => OrderStatusSchema),z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  paymentStatus: z.union([ z.lazy(() => PaymentStatusSchema),z.lazy(() => EnumPaymentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutOrderNestedInputSchema).optional(),
  Quantity: z.lazy(() => QuantityUpdateManyWithoutOrderNestedInputSchema).optional()
}).strict();

export default OrderUpdateInputSchema;
