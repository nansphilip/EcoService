import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductUpdateWithoutQuantityInputSchema } from './ProductUpdateWithoutQuantityInputSchema';
import { ProductUncheckedUpdateWithoutQuantityInputSchema } from './ProductUncheckedUpdateWithoutQuantityInputSchema';
import { ProductCreateWithoutQuantityInputSchema } from './ProductCreateWithoutQuantityInputSchema';
import { ProductUncheckedCreateWithoutQuantityInputSchema } from './ProductUncheckedCreateWithoutQuantityInputSchema';
import { ProductWhereInputSchema } from './ProductWhereInputSchema';

export const ProductUpsertWithoutQuantityInputSchema: z.ZodType<Prisma.ProductUpsertWithoutQuantityInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutQuantityInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedCreateWithoutQuantityInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export default ProductUpsertWithoutQuantityInputSchema;
