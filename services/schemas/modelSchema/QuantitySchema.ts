import { z } from 'zod';
import { ProductWithRelationsSchema } from './ProductSchema'
import type { ProductWithRelations } from './ProductSchema'
import { OrderWithRelationsSchema } from './OrderSchema'
import type { OrderWithRelations } from './OrderSchema'

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

/////////////////////////////////////////
// QUANTITY RELATION SCHEMA
/////////////////////////////////////////

export type QuantityRelations = {
  product: ProductWithRelations;
  Order: OrderWithRelations;
};

export type QuantityWithRelations = z.infer<typeof QuantitySchema> & QuantityRelations

export const QuantityWithRelationsSchema: z.ZodType<QuantityWithRelations> = QuantitySchema.merge(z.object({
  product: z.lazy(() => ProductWithRelationsSchema),
  Order: z.lazy(() => OrderWithRelationsSchema),
}))

export default QuantitySchema;
