import { z } from 'zod';
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'
import { QuantityWithRelationsSchema } from './QuantitySchema'
import type { QuantityWithRelations } from './QuantitySchema'
import { CategoryWithRelationsSchema } from './CategorySchema'
import type { CategoryWithRelations } from './CategorySchema'

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

/**
 * Product model
 */
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  vendorId: z.string(),
  categoryId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT RELATION SCHEMA
/////////////////////////////////////////

export type ProductRelations = {
  Vendor: UserWithRelations;
  Quantity: QuantityWithRelations[];
  Category?: CategoryWithRelations | null;
};

export type ProductWithRelations = z.infer<typeof ProductSchema> & ProductRelations

export const ProductWithRelationsSchema: z.ZodType<ProductWithRelations> = ProductSchema.merge(z.object({
  Vendor: z.lazy(() => UserWithRelationsSchema),
  Quantity: z.lazy(() => QuantityWithRelationsSchema).array(),
  Category: z.lazy(() => CategoryWithRelationsSchema).nullable(),
}))

export default ProductSchema;
