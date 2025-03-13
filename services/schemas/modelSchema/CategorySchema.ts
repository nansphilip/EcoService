import { z } from 'zod';
import { ProductWithRelationsSchema } from './ProductSchema'
import type { ProductWithRelations } from './ProductSchema'

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

/**
 * Category model
 */
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// CATEGORY RELATION SCHEMA
/////////////////////////////////////////

export type CategoryRelations = {
  Products: ProductWithRelations[];
};

export type CategoryWithRelations = z.infer<typeof CategorySchema> & CategoryRelations

export const CategoryWithRelationsSchema: z.ZodType<CategoryWithRelations> = CategorySchema.merge(z.object({
  Products: z.lazy(() => ProductWithRelationsSchema).array(),
}))

export default CategorySchema;
