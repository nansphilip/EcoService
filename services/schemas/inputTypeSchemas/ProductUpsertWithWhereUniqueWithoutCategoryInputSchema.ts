import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithoutCategoryInputSchema } from './ProductUpdateWithoutCategoryInputSchema';
import { ProductUncheckedUpdateWithoutCategoryInputSchema } from './ProductUncheckedUpdateWithoutCategoryInputSchema';
import { ProductCreateWithoutCategoryInputSchema } from './ProductCreateWithoutCategoryInputSchema';
import { ProductUncheckedCreateWithoutCategoryInputSchema } from './ProductUncheckedCreateWithoutCategoryInputSchema';

export const ProductUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export default ProductUpsertWithWhereUniqueWithoutCategoryInputSchema;
