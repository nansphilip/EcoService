import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ProductWhereInputSchema } from './ProductWhereInputSchema';
import { ProductUpdateWithoutQuantityInputSchema } from './ProductUpdateWithoutQuantityInputSchema';
import { ProductUncheckedUpdateWithoutQuantityInputSchema } from './ProductUncheckedUpdateWithoutQuantityInputSchema';

export const ProductUpdateToOneWithWhereWithoutQuantityInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutQuantityInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutQuantityInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutQuantityInputSchema) ]),
}).strict();

export default ProductUpdateToOneWithWhereWithoutQuantityInputSchema;
