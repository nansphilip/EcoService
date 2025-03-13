import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategoryCreateWithoutProductsInputSchema } from './CategoryCreateWithoutProductsInputSchema';
import { CategoryUncheckedCreateWithoutProductsInputSchema } from './CategoryUncheckedCreateWithoutProductsInputSchema';
import { CategoryCreateOrConnectWithoutProductsInputSchema } from './CategoryCreateOrConnectWithoutProductsInputSchema';
import { CategoryUpsertWithoutProductsInputSchema } from './CategoryUpsertWithoutProductsInputSchema';
import { CategoryWhereInputSchema } from './CategoryWhereInputSchema';
import { CategoryWhereUniqueInputSchema } from './CategoryWhereUniqueInputSchema';
import { CategoryUpdateToOneWithWhereWithoutProductsInputSchema } from './CategoryUpdateToOneWithWhereWithoutProductsInputSchema';
import { CategoryUpdateWithoutProductsInputSchema } from './CategoryUpdateWithoutProductsInputSchema';
import { CategoryUncheckedUpdateWithoutProductsInputSchema } from './CategoryUncheckedUpdateWithoutProductsInputSchema';

export const CategoryUpdateOneWithoutProductsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutProductsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutProductsInputSchema),z.lazy(() => CategoryUpdateWithoutProductsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
}).strict();

export default CategoryUpdateOneWithoutProductsNestedInputSchema;
