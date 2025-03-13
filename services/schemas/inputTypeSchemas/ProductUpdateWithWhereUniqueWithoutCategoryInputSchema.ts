import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereUniqueInputSchema } from './ProductWhereUniqueInputSchema';
import { ProductUpdateWithoutCategoryInputSchema } from './ProductUpdateWithoutCategoryInputSchema';
import { ProductUncheckedUpdateWithoutCategoryInputSchema } from './ProductUncheckedUpdateWithoutCategoryInputSchema';

export const ProductUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutCategoryInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export default ProductUpdateWithWhereUniqueWithoutCategoryInputSchema;
