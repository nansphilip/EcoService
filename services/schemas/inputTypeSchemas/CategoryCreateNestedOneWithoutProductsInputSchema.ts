import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CategoryCreateWithoutProductsInputSchema } from './CategoryCreateWithoutProductsInputSchema';
import { CategoryUncheckedCreateWithoutProductsInputSchema } from './CategoryUncheckedCreateWithoutProductsInputSchema';
import { CategoryCreateOrConnectWithoutProductsInputSchema } from './CategoryCreateOrConnectWithoutProductsInputSchema';
import { CategoryWhereUniqueInputSchema } from './CategoryWhereUniqueInputSchema';

export const CategoryCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutProductsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export default CategoryCreateNestedOneWithoutProductsInputSchema;
