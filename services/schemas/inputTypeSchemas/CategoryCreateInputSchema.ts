import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductCreateNestedManyWithoutCategoryInputSchema } from './ProductCreateNestedManyWithoutCategoryInputSchema';

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Products: z.lazy(() => ProductCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export default CategoryCreateInputSchema;
