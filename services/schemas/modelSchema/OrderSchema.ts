import { z } from 'zod';
import { OrderStatusSchema } from '../inputTypeSchemas/OrderStatusSchema'
import { PaymentStatusSchema } from '../inputTypeSchemas/PaymentStatusSchema'
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'
import { QuantityWithRelationsSchema } from './QuantitySchema'
import type { QuantityWithRelations } from './QuantitySchema'

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

/**
 * Order model
 */
export const OrderSchema = z.object({
  orderStatus: OrderStatusSchema,
  paymentStatus: PaymentStatusSchema,
  id: z.string(),
  /**
   * Order number for the customer
   */
  orderNumber: z.number().int(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Order = z.infer<typeof OrderSchema>

/////////////////////////////////////////
// ORDER RELATION SCHEMA
/////////////////////////////////////////

export type OrderRelations = {
  User: UserWithRelations;
  Quantity: QuantityWithRelations[];
};

export type OrderWithRelations = z.infer<typeof OrderSchema> & OrderRelations

export const OrderWithRelationsSchema: z.ZodType<OrderWithRelations> = OrderSchema.merge(z.object({
  User: z.lazy(() => UserWithRelationsSchema),
  Quantity: z.lazy(() => QuantityWithRelationsSchema).array(),
}))

export default OrderSchema;
