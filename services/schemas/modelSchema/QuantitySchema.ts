import { z } from 'zod';

/////////////////////////////////////////
// QUANTITY SCHEMA
/////////////////////////////////////////

/**
 * Quantity model
 */
export const QuantitySchema = z.object({
  id: z.string(),
  quantity: z.number().int(),
  productId: z.string(),
  orderId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Quantity = z.infer<typeof QuantitySchema>

export default QuantitySchema;
