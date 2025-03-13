import { z } from 'zod';
import { OrderStatusSchema } from '../inputTypeSchemas/OrderStatusSchema'
import { PaymentStatusSchema } from '../inputTypeSchemas/PaymentStatusSchema'

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

export default OrderSchema;
