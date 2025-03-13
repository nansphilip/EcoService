import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategoryUpdateWithoutProductsInputSchema } from './CategoryUpdateWithoutProductsInputSchema';
import { CategoryUncheckedUpdateWithoutProductsInputSchema } from './CategoryUncheckedUpdateWithoutProductsInputSchema';
import { CategoryCreateWithoutProductsInputSchema } from './CategoryCreateWithoutProductsInputSchema';
import { CategoryUncheckedCreateWithoutProductsInputSchema } from './CategoryUncheckedCreateWithoutProductsInputSchema';
import { CategoryWhereInputSchema } from './CategoryWhereInputSchema';

export const CategoryUpsertWithoutProductsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutProductsInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutProductsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export default CategoryUpsertWithoutProductsInputSchema;
